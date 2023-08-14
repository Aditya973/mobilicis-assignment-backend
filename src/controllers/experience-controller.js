const {ExperienceService} = require('../services/index');

const experienceService = new ExperienceService();

const create = async (req,res) => {
    try {
        const experience = await experienceService.create(req.body);
        return res.status(201).json({
            data:experience,
            success:true,
            message:'successfully created a experience',
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
        const experience = await experienceService.get(req.params.id);
        return res.status(200).json({
            data:experience,
            success:true,
            message:'successfully fetched the experience',
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
const destroy = async(req,res) => {
    try {
        const response = await experienceService.destroy(req.params.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:'successfully deleted the experience',
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
        const experience = await experienceService.update(req.params.id,req.body);
        return res.status(200).json({
            data:experience,
            success:true,
            message:'successfully updated the experience',
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

const getByUserId = async(req,res) => {
    try {
        const response = await experienceService.getByUserId(req.params.userId);
        return res.status(200).json({
            data:response,
            success:true,
            message:'successfully updated the experience',
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
    destroy,
    update,
    get,
    getByUserId
}