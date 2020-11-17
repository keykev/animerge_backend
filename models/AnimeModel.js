const mongoose = require("mongoose")


const AnimeSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        text:true
    },
    description: {
        type: String,
        required:true,
    },
    img: {
        type: String
    },
    episodes: {
        type:Number 
    },
    dubbing: {
        type:String,
        required:true
    },
    genres: {
        type:Array,
        default: []
    },
    url: {
        type:String,
        required:true
    },
    hot: {
        type:Boolean,
        default:false
    },
    popular: {
        type:Boolean,
        default:false
    },
    date_created: {
        type: Date,
        default: Date.now
    }
})

//create index for title


const AnimeModel = mongoose.model('AnimeModel',AnimeSchema)


//Ensures that index is created
// AnimeModel.ensureIndexes(function(err) {
//     if(err) {
//         console.log('Error in ensuring indexes')
//     }
//     else {
//         console.log('Successfully created index')
//     }
// })

module.exports = AnimeModel