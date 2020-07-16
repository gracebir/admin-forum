const mongoose = require('mongoose');
const config = require('config');

// connect db mongoose database

const uri = config.get('mongoURI');

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true},()=>{
    console.log('Mongodb Connected');
});


module.exports = mongoose;