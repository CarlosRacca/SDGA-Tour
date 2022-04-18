const { Router } = require('express');
const axios = require('axios');
const {Videogame, Genre} = require('../database');


const router = Router();

const getApiInfo = async () => {
    const apiUrl1 = await axios.get(`https://api.rawg.io/api/games?key=db5d960df49c48e7a2b0ac6dbb92505f&page_size=40&page=1`)
    const apiUrl2 = await axios.get(`https://api.rawg.io/api/games?key=db5d960df49c48e7a2b0ac6dbb92505f&page_size=40&page=2`)
    const apiUrl3 = await axios.get(`https://api.rawg.io/api/games?key=db5d960df49c48e7a2b0ac6dbb92505f&page_size=40&page=3`)
    
    let data1 = apiUrl1.data.results
    let data2 = apiUrl2.data.results
    let data3 = apiUrl3.data.results

    let totalApiInfo = [...data1, ...data2,...data3];

    const apiInfo = await totalApiInfo.map(el => {
        return {
            id: el.id,
            name: el.name,
            description: el.description,
            releaseDate: el.released,
            platforms: el.platforms.map(el => el.platform.name),
            rating: el.rating,
            img: el.background_image,
            genres: el.genres.map(el => el.name)
        }
    })
    return apiInfo
}

const getDbInfo = async () => {
    return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    })
}

const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get('/', async(req, res) => {
    let videogamesTotal = await getAllVideogames();
    res.status(200).send(videogamesTotal)
})

module.exports = router;