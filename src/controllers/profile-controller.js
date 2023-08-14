const ProfileService = require('../services/profile-service');

const profileService = new ProfileService();

const create = async (req,res) => {
    try {
        const profile = await profileService.create(req.body);
        return res.status(201).json({
            data:profile,
            success:true,
            message:'successfully created a profile',
            err:{}
        })
    } catch (error) {
        res.status(500).json({
            data:{},
            success:false,
            message:'something in went wrong',
            err: error
        });
    }
}

const get = async(req,res) => {
    try {
        const profile = await profileService.get(req.params.id);
        return res.status(200).json({
            data:profile,
            success:true,
            message:'successfully fetched the profile',
            err:{}
        })
    } catch (error) {
        res.status(500).json({
            data:{},
            success:false,
            message:'something in went wrong',
            err: error
        });
    }
}

const update = async (req,res) => {
    try {
        const profile = await profileService.update(req.params.id,req.body);
        return res.status(200).json({
            data:profile,
            success:true,
            message:'successfully fetched the profile',
            err:{}
        })
    } catch (error) {
        res.status(500).json({
            data:{},
            success:false,
            message:'something in went wrong',
            err: error
        });
    }
}
const getByUserId = async (req,res) => {
    try {
        const profile = await profileService.getByUserId(req.params.userId);
        return res.status(200).json({
            data:profile,
            success:true,
            message:'successfully fetched the profile',
            err:{}
        })
    } catch (error) {
        res.status(500).json({
            data:{},
            success:false,
            message:'something in went wrong',
            err: error
        });
    }
}

module.exports = {
    create,
    get,
    update,
    getByUserId
}