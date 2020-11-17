const mongoose = require('mongoose')


const EpisodeSchema = new mongoose.Schema({
    episode: {
        type:String,
        required:true
    },
    episodeNumber:   {
        type:String,
        required:true
    },
    canon: {
        type:Boolean,
        default:true
    },
    date_created: {
        type:Date,
        default: Date.now
    },
    anime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AnimeModel"
    }
})


const EpisodeModel = mongoose.model('EpisodeModel',EpisodeSchema)

module.exports = EpisodeModel;