const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const EpisodeModel = require("../models/EpisodeModel")


//@POST      /episode/post
//@desc      posts an episode
router.post('/post',async(req,res) => {
    try {
        const episode = req.body.episode
        const canon = req.body.canon
        const anime = req.body.anime
        const episodeNumber = req.body.episodeNumber

        const newEpisode = await EpisodeModel.create({
            episode,
            anime,  
            episodeNumber,
            canon
        })

        if(!newEpisode) {
            return res.status(400).json({msg: "request error"})
        }
        return res.status(200).send(newEpisode)
    }
    catch(err) {
        console.log(err)
    }
})

//@GET      /episode/anime/:animeId
//@desc     get all anime videos
router.get('/anime/:animeId', async(req,res) => {
    try {
        const episodes = await EpisodeModel.find({
            anime: req.params.animeId
        })

        if(!episodes) {
            return console.log('episodes dont exists')
        }
        return res.status(200).send(episodes)

    }
    catch(err) {
        console.log(err)
    }

})

//@GET      /episode/:id
//@desc     get specific video
router.get('/:id',async(req,res) => {
    
    const episode = await EpisodeModel.findOne({_id: mongoose.Types.ObjectId(req.params.id)}).populate('anime').lean()

    try {
        if(!episode) {
            return console.log('Episode does not exist')
        }
        return res.status(200).send(episode)
    }
    catch(err) {
        console.log(err)
    }
    
})



//@GET      /episode/
//@desc     get all the latest episodes
router.get('/',async(req,res) => {
    try {
        const allEpisodes = await EpisodeModel.find({}).populate('anime').sort({date_created:"-1"}).limit(6).lean()

        if(allEpisodes) {
            return res.status(200).send(allEpisodes)
        }
    }
    catch(err) {
        console.log(err)
    }
})







module.exports = router;