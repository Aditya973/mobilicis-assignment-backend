const {UserRepository,ProfileRepository} = require('../repositories/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_KEY} = require('../config/serverConfig')

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
        this.profileRepository = new ProfileRepository();
    }

    async signUp(data){
        try {
            const user = await this.userRepository.create(data);
            const profile = await this.profileRepository.create({
                userId: user._id,
                firstName: data.firstName, 
                lastName: data.lastName
            });
            return user;
        }
        catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    
    async signIn(data) {
        try {
            const email = data.email;
            const plainPassword = data.password;
            //fetch the user by email
            const user = await this.getUserByEmail(email);

            //compare incomming plain password with stored encrypted password
            const passwordMatch = this.checkPassword(plainPassword,user.password);

            if(!passwordMatch){
                console.log('password does not match!');
                throw {message: 'invalid password'}
            }

            // if password match create a new token and send it to the user
            const newJwt = this.createToken({email:user.email, id: user.id});
            return newJwt;
        } catch (error) {
            console.log(error);
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async get(userId){
        try {
            const user = await this.userRepository.get(userId);
            return user;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findBy({ email });
            return user;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }

    async isAuthenticated(token){
        try{
            const response = this.verifyToken(token);
            console.log(response);
            if(!response){
                throw {error:'Invalid Token'};  
            }
            const user = await this.get(response.id);
            if(!user){
                throw {error: 'No user with the corresponding token'};
            }
            return user.id;
        }
        catch(error){
            console.log('something went wrong in the auth process');
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in token validation ",error);
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const response = await this.userRepository.isAdmin(userId);
            return response;
        } catch (error) {
            console.log("something went wrong in service layer");
            throw error
        }
    }

    async destroy(userId){
        try{
            const profile = await this.profileRepository.getByUserId(userId);
            await this.profileRepository.destroy(profile._id);
            const response = await this.userRepository.destroy(userId);
            return response;
        }
        catch(error){
            console.log("something went wrong in service layer");
            throw error
        }
    }

    async update(userId,data){
        try{
            const user = await this.userRepository.update(userId,data);
            return user;
        }
        catch(error){
            console.log("something went wrong in service layer");
            throw error
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
            return result;
        } catch (error) {
            console.log("something went wrong in token creation");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("something went wrong in comparing password");
            throw error;
        }
    }

    async connect(userId,data){
        try {
            const profile1 = await this.profileRepository.getByUserId(userId);
            const profile2 = await this.profileRepository.getByUserId(data);

            const response = profile1.connections.find((id)=> {return(id == data)})
            if(response){
                throw {
                    message: 'you are already in connection with the user'
                }
            }
            profile1.connections.push(data);
            profile2.connections.push(profile1.userId);
            await profile1.save();
            await profile2.save();
        } catch (error) {
            console.log("something went wrong in service layer");
            throw error
        }
    }
    async removeConnection(userId,data){
        try {
            const profile1 = await this.profileRepository.getByUserId(userId);
            const profile2 = await this.profileRepository.getByUserId(data);
            const response = profile1.connections.find((id)=>{
                return (id == data)
            });
            if(!response){
                throw {message: 'you are not connected to this user'}
            }
            profile1.connections.pull(data);
            profile2.connections.pull(profile1.userId);
            await profile1.save();
            await profile2.save();
        } catch (error) {
            console.log(error);
            console.log("something went wrong in service layer");
            throw error
        }
    }
}

module.exports = UserService;