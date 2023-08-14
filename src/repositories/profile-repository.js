const Profile = require('../models/Profile');
const CrudRepository = require('./crud-repository');
class ProfileRepository extends CrudRepository{
    constructor(){
        super(Profile);
    }
    async getByUserId(id){
        try {
            const profile = await Profile.findOne({
                userId:id
            });
            return profile;
            
        } catch (error) {
            console.log('something went wrong on repository layer');
            throw error;
        }
    }
}

module.exports = ProfileRepository;