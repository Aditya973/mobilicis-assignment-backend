const {UserService} = require('../services/index');
const userService = new UserService();

const validateUserAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data : {},
            success : false,
            message : 'something went wrong',
            err : 'missing email or password'
        })
    }
    next();
}

const validateIsAdminRequest = (req,res,next) => {
    if(!req.body.id){
        return res.status(400).json({
            data:{},
            success: false,
            err : 'User Id not given',
            message: 'something went wrong'
        })
    }
    next();
}

const isAuthorized = async (req,res,next) => {
    try {
        const token = req.headers['x-access-token'];    
        const response = await userService.isAuthenticated(token);
        const isUserAdmin = await userService.isAdmin(response);
        if(response != req.body.userId && !isUserAdmin){
            throw {message: 'not authorized'}
        }
        next();
    } catch (error) {
        return res.status(500).json({
            data : {},
            success : false,
            message: 'something went wrong, you are not authorized',
            err : error
        });
    }
}

const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.headers['x-access-token'];    
        const response = await userService.isAuthenticated(token);
        // console.log(response);
        if(!response){
            throw {
                message: 'you are not authenticated'
            }
        }
        next();
    } catch (error) {
        return res.status(500).json({
            data : {},
            success : false,
            message: 'something went wrong, you are not authenticated',
            err : error
        });
    }
}
const isAdmin = async (req,res,next) => {
    try {
        const token = req.headers['x-access-token']; 
        const userId = await userService.isAuthenticated(token);
        const isUserAdmin = await userService.isAdmin(userId);
        if(!isUserAdmin){
            throw {
                message: 'you are not authorized'
            }
        }
        next();
    } catch (error) {
        return res.status(500).json({
            data : {},
            success : false,
            message: 'something went wrong, you are not authorized',
            err : error
        });
    }
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest,
    isAuthenticated,
    isAdmin,
    isAuthorized
}