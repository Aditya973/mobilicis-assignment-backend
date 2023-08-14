const express = require('express');
const {PORT} = require('./config/serverConfig');
const bodyParser = require('body-parser'); 
const connect = require('./config/database');
const apiRoutes = require('./routes/index');

const setupAndCreateServer = async ()=>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    await connect();
    console.log('mongodb connected')
    app.listen(PORT,async ()=>{
        console.log('server listening to port',PORT);
    })
}

setupAndCreateServer();