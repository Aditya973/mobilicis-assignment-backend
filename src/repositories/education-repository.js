const Education = require('../models/Education');
const CrudRepository = require('./crud-repository');

class EducationRepository extends CrudRepository{
    constructor(){
        super(Education);
    }
    async getByUserId(id){
        try {
            const response = await Education.find({
                userId: id
            })
            return response;            
        } catch (error) {
            console.log('something went wrong in repository layer');
            throw error;            
        }
    }
}

module.exports = EducationRepository;