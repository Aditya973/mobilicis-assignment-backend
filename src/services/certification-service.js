const {CertificateRepository, ProfileRepository} = require('../repositories/index');

class CertificateService {
    constructor(){
        this.certificateRepository = new CertificateRepository();
        this.profileRepository = new ProfileRepository();
    }
    async create(data){
        try {
            const certificate = await this.certificateRepository.create(data);
            const profile = await this.profileRepository.getByUserId(data.userId);
            profile.certificates.push(certificate);
            await profile.save();
            return certificate;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async destroy(id){
        try {
            const certificate = await this.certificateRepository.get(id);
            const profile = await this.profileRepository.getByUserId(certificate.userId);
            const response = await this.certificateRepository.destroy(id);
            profile.certificates.pull(certificate._id);
            await profile.save();
            return response;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async get(id){
        try {
            const certificate = await this.certificateRepository.get(id);
            return certificate;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async update(id,data){
        try {
            const certificate = await this.certificateRepository.update(id,data);
            return certificate;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
    async getByUserId(id){
        try {
            const response = await this.certificateRepository.getByUserId(id);
            return response;            
        } catch (error) {
            console.log('something went wrong in repository layer');
            throw error;            
        }
    }
}

module.exports = CertificateService;