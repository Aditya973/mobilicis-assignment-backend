const {EducationRepository,ProfileRepository} = require('../repositories/index')

class EducationService {
    constructor(){
        this.educationRepository = new EducationRepository;
        this.profileRepository = new ProfileRepository();
    }

    async create(data){
        try {
            const education = await this.educationRepository.create(data);
            const profile = await this.profileRepository.getByUserId(data.userId);
            profile.education.push(education);
            await profile.save();
            return education;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async destroy(id){
        try {
            const education = await this.educationRepository.get(id);
            const profile = await this.profileRepository.getByUserId(education.userId);
            const response = await this.educationRepository.destroy(id);
            profile.education.pull(education._id);
            await profile.save();
            return response;
        } catch (error) {
            console.log(error);
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async get(id){
        try {
            const education = await this.educationRepository.get(id);
            return education;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async update(id,data){
        try {
            const education = await this.educationRepository.update(id,data);
            return education;
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

module.exports = EducationService;