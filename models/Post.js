const mongodb = require('../server/index');



const PostSchema = mongodb.Schema({
    title:{
        type:String,
        required: true
    },
    file:{
        data: Buffer,
        contentType: String
    },
    date_up:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongodb.model('post',PostSchema);
