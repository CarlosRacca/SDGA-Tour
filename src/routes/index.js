const { Router } = require('express');
const axios = require('axios');
const {Scores, Users} = require('../database');


const router = Router();

router.post('/score', async(req, res) => {
    let {front_nine, back_nine, handicap, date, matricula} = req.body;
    
    try {
        let scorePost = await Scores.create({front_nine, back_nine, handicap, date, matricula});
        
        res.status(200).send(scorePost)
        
    } catch (error) {
        res.status(404).send(error)
    }
 
})

router.post('/user', async(req, res) => {
    let {name, lastname, email, password, matricula} = req.body;
    
    try {
        let userCreated = await Users.create({name, lastname, email, password, matricula});
        res.status(200).send(userCreated) 
        
    } catch (error) {
        res.status(404).send(error) 
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

router.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
  if (!id) {
    return res.status(400).send({
      message: "Por favor suministra el id que estas tratando de eliminar.!",
    });
  }

  const user = await Users.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    return res.status(400).send({
      message: `No se encontró usiario con el id ${id}`,
    });
  }

  try {
    await user.destroy();
    return res.send({
      message: `Usuario con id ${id} ha sido eliminado!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
})

module.exports = router;