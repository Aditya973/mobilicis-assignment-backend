const Experience = require('../models/Experience');
const CrudRepository = require('./crud-repository');

class ExperienceRepository extends CrudRepository{
    constructor(){
        super(Experience);
    }
    async getByUserId(id){
        try {
            const response = await Experience.find({
                userId: id
            })
            return response;            
        } catch (error) {
            console.log('something went wrong in repository layer');
            throw error;            
        }
    }
}

module.exports = ExperienceRepository;