const {EducationService} = require('../services/index');

const educationService = new EducationService();

const create = async (req,res) => {
    try {
        const education = await educationService.create(req.body);
        return res.status(201).json({
            data:education,
            success:true,
            message:'successfully created a education',
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
        const education = await educationService.get(req.params.id);
        return res.status(200).json({
            data:education,
            success:true,
            message:'successfully fetched the education',
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
        const response = await educationService.destroy(req.params.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:'successfully deleted the education',
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
        const education = await educationService.update(req.params.id,req.body);
        return res.status(200).json({
            data:education,
            success:true,
            message:'successfully updated the education',
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
        const response = await educationService.getByUserId(req.params.userId);
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