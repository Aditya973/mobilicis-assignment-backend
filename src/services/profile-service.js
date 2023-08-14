const {ProfileRepository} = require('../repositories/index');

class ProfileService {
    constructor(){
        this.profileRepository = new ProfileRepository;
    }
    async create(data){
        try {
            const profile = await this.profileRepository.create(data);
            return profile;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async get(id){
        try {
            const profile = await this.profileRepository.get(id);
            return profile;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async getByUserId(userId){
        try {
            const profile = await this.profileRepository.getByUserId(userId);
            return profile;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async update(id,data){
        try {
            const profile = await this.profileRepository.update(id,data);
            return profile;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
}

module.exports = ProfileService;