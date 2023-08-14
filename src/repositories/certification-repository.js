const Certification = require('../models/Certification');
const CrudRepository = require('./crud-repository');

class CertificateRepository extends CrudRepository{
    constructor(){
        super(Certification);
    }
    
    async getByUserId(id){
        try {
            const response = await Certification.find({
                userId: id
            })
            return response;            
        } catch (error) {
            console.log('something went wrong in repository layer');
            throw error;            
        }
    }
}

module.exports = CertificateRepository;