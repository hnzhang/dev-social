const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user :{
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    text:{
        type: String,
        required: true,
    },
    name: {
        type:String,
    },
    avatar:{
        type: String,
    },
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: "Users",
            }
        }
    ],
    comments:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: "Users",
            },
            text:{
                type: String,
            },
            name:{
                type: String
            },
            avatar:{
                type:String
            },
        },
    ],
});

module.exports = Post = mongoose.model("Posts", PostSchema);