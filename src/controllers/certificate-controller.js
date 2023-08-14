const CertificateService = require('../services/certification-service');

const certificateService = new CertificateService();

const create = async (req,res) => {
    try {
        const certificate = await certificateService.create(req.body);
        return res.status(201).json({
            data:certificate,
            success:true,
            message:'successfully created a certificate',
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
        const certificate = await certificateService.get(req.params.id);
        return res.status(200).json({
            data:certificate,
            success:true,
            message:'successfully fetched the certificate',
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
        const response = await certificateService.destroy(req.params.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:'successfully deleted the certificate',
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
        const certificate = await certificateService.update(req.params.id,req.body);
        return res.status(200).json({
            data:certificate,
            success:true,
            message:'successfully updated the certificate',
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
        const response = await certificateService.getByUserId(req.params.userId);
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