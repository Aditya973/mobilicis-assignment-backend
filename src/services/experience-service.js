const {ExperienceRepository, ProfileRepository} = require('../repositories/index');

class ExperienceService{
    constructor(){
        this.experienceRepository = new ExperienceRepository();
        this.profileRepository = new ProfileRepository();
    }
    async create(data){
        try {
            const experience = await this.experienceRepository.create(data);
            const profile = await this.profileRepository.getByUserId(data.userId);
            profile.experience.push(experience);
            await profile.save();
            return experience;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async destroy(id){
        try {
            const experience = await this.experienceRepository.get(id);
            const profile = await this.profileRepository.getByUserId(experience.userId);
            const response = await this.experienceRepository.destroy(id);
            profile.experience.pull(experience._id);
            await profile.save();
            return response;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async get(id){
        try {
            const experience = await this.experienceRepository.get(id);
            return experience;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async update(id,data){
        try {
            const experience = await this.experienceRepository.update(id,data);
            return experience;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async getByUserId(id){
        try {
            const response = await this.educationRepository.getByUserId(id);
            return response;            
        } catch (error) {
            console.log('something went wrong in repository layer');
            throw error;            
        }
    }
}

module.exports = ExperienceService;