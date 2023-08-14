const dotenv = require('dotenv');

dotenv.config();

const obj = {
    PORT : process.env.PORT,
    CONNECTION: process.env.CONNECTION,
    JWT_KEY: process.env.JWT_KEY
}

module.exports = obj;