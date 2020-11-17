const express = require('express');
const { db } = require('../models/AnimeModel');
const router = express.Router()

const AnimeModel = require("../models/AnimeModel")

//@POST          /anime/post
//@desc          creates new anime
router.post('/post', async(req,res) => {
    try{
        const title = req.body.title;
        const description = req.body.description;
        const img = req.body.img
        const episodes = req.body.episodes;
        const url = req.body.url;
        const dubbing = req.body.dubbing
        const hot = req.body.hot 
        const popular = req.body.popular
        const genres = req.body.genres

        

        const newAnime = await AnimeModel.create({
            title: title,
            description: description,
            img: img,
            episodes: episodes,
            dubbing: dubbing,
            hot: hot,
            popular:popular,
            genres: genres,
            url: url
        })

        if(!newAnime) {
            return res.status(400).json({msg: "no anime found"})
        }

        return res.status(200).json({anime: newAnime})
    }
    catch(err) {
        //console.log(err)
        console.log('Error in creating new anime: ',err)
    }
    
})

//@GET      /anime/
//@desc     get updated animes from database
router.get('/',async(req,res) => {
    try {
        const animes = await AnimeModel.find({}).sort({date_created: "-1"})

        return res.status(200).send(animes)
    }
    catch(err) {    
        console.log('Error in obtaining all anime')
    }
})

//@POST      /anime/search
//@desc     search for anime of what user types in.
router.post('/search', async(req,res) => {
    try {
        const search = req.body.search;
        
        //searches for text
        const searching = await AnimeModel.find({
            $text: {
                $search: search
            }
        })
        if(!searching) {
            return console.log("error in searching")
        }

        return res.status(200).send(searching)
    }
    catch(err) {
        console.log("error in search: ",err)
    }
})


//@GET      /anime/:animeUrl
//@desc     get specific anime with anime's url
router.get('/v1/:animeUrl', async(req,res) => {
    try {   
        const anime = await AnimeModel.find({
            url: req.params.animeUrl
        })

        if(!anime) {
            return console.log("response doesnt exists")
        }
        return res.status(200).send(anime)
    }
    catch(err) {
        console.log("Error in getting anime from anime url: ",err)
    }
    

})

//@GET      /anime/tabs/hot
//@desc     get all the hot anime
router.get('/tabs/hot',async(req,res) => {
    try {
        const hotAnime = await AnimeModel.find({
            hot: true
        }).limit(6)

        if(!hotAnime) {
            return console.log("Unable to find any anime that is hot")
        }
        return res.status(200).send(hotAnime)
    }
    catch(err) {
        console.log("Error in fetching hot anime")
    }
})

//@GET      /anime/tabs/popular
//@desc     get all popular anime from database
router.get('/tabs/popular', async(req,res) => {
    // const popularAnime = await AnimeModel.find({
    //     popular:true
    // }).limit(6)
    const popularAnime = await AnimeModel.aggregate([
            { $match: {popular: true} },
            { $sample: {size: 6} }
        ])

    try {
        if(!popularAnime) {
            return console.log("Popular animes dont exists")
        }
        res.status(200).send(popularAnime)
    }
    catch(err) {
        console.log("Error in fetching popular anime")
    }
})

//@GET     /anime/browse/:genre
//@desc     get anime with specific genre
router.get('/browse/:genre', async(req,res) => {
    try {
        const animeWithGenre = await AnimeModel.find({
            genres: req.params.genre
        }).sort({title: "1"})

        if(!animeWithGenre) {
            console.log('Error in getting genre')
        }
        res.status(200).send(animeWithGenre)
    }
    catch(err) {
        console.log("unable to get genre: ",err)
    }
})

//@GET      /anime/popular
//@desc     get all popular anime from database
router.get('/popular', async(req,res) => {
    try {
        const popularAnime = await AnimeModel.find({
            popular:true
        }).sort({title: "1"})

        if(!popularAnime) {
            return console.log("Popular animes dont exists")
        }
        res.status(200).send(popularAnime)
    }
    catch(err) {
        console.log("Error in fetching popular anime")
    }
})

module.exports = router






