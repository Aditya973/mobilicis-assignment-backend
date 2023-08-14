const User =  require('../models/User');
const CrudRepository = require('./crud-repository');

class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async findBy(data){
        try {
            const user = await User.findOne(data);
            console.log(user);
            return user;
        } catch (error) {
            console.log('something went wrong in the repository layer');
            console.log(error);
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findById(userId);
            const response = user.isAdmin;
            return response;
        } catch (error) {
            console.log('something went wrong in the repository layer');
            console.log(error);
        }
    }
}

module.exports = UserRepository;