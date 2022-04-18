const { Router } = require('express');
const axios = require('axios');
const {Scores, Users} = require('../database');


const router = Router();

router.post('/score', async(req, res) => {
    let {front_nine, back_nine, handicap, date} = req.body;
    
    try {
        let scorePost = await Scores.create({front_nine, back_nine, handicap, date});

        res.status(200).send(scorePost)

    } catch (error) {
        res.status(404).send('Cannot post this score')
    }
})

router.post('/user', async(req, res) => {
    let {name, lastname, email, password} = req.body;
    
    try {
        let userCreated = await Users.create({name, lastname, email, password});
        res.status(200).send(userCreated) 
    } catch (error) {
        res.status(404).send("Cannot create this user") 
    }
})

router.get('/scores', async(req, res) => {
    
    try {
        let scoresTotal = await Scores.findAll()
        res.status(200).send(scoresTotal)
    } catch (error) {
        res.status(404).send('Error getting the scores')
    }
})

router.get('/users', async(req, res) => {
    
    try {
        let usersTotal = await Users.findAll()
        res.status(200).send(usersTotal)
    } catch (error) {
        res.status(404).send('Error getting the users')
    }
})

router.get('/', async(req, res) => {
    
    res.status(200).send('Bienvenido al SDGA Tour!')
})

module.exports = router;