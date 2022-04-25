const { Router } = require('express');
const axios = require('axios');
const {Scores, Users, Dates} = require('../database');



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

router.get('/scoresUser', async(req, res) => {
    try {
        let scores = await Scores.findAll()
        let users = await Users.findAll()

        let scores2 = scores.map(el => {
            return{
                id: el.id,
                matricula: el.matricula,
                user: users.filter(player => player.matricula === el.matricula).map(player => player.name + ' ' + player.lastname)[0],
                front_nine: el.front_nine,
                back_nine: el.back_nine,
                handicap: el.handicap,
                totalGross: el.front_nine + el.back_nine,
                totalNeto: el.front_nine + el.back_nine - el.handicap,
                date: el.date,
                month: el.date.slice(3, 5),
                year: el.date.slice(6),
                day: el.date.slice(0,2)
            }
        })

        res.send(scores2)
    } catch (error) {
        res.send(error)
    }
})

router.post('/date', async(req, res) => {
    let {day, month, year} = req.body;
    
    try {
        let dateCreated = await Dates.create({day, month, year});
        res.status(200).send(dateCreated) 
        
    } catch (error) {
        res.status(404).send(error) 
    }
})

router.get('/dates', async(req, res) => {
    try {
        let datesTotal = await Dates.findAll()
        res.status(200).send(datesTotal)
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

router.delete('/score/:id', async (req, res) => {
    const id = req.params.id

    if(!id){
        return res.status(400).send({
            message: "Por favor suministra el id de la tarjeta que estas tratando de eliminar"
        })
    }

    const score = await Scores.findOne({
        where: {
            id
        }
    })

    if(!score){
        return res.status(400).send({
            message: `No se encontro la tarjeta con el id ${id}`
        })
    }

    try {
        await score.destroy();

        return res.send({
            message: `Tarjeta con el id ${id} ha sido eliminada`
        })
    } catch (error) {
        return res.status(500).send({
            message: `Error: ${error.message}`,
          });
    }
})

router.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
  if (!id) {
    return res.status(400).send({
      message: "Por favor suministra el id del usuario que estas tratando de eliminar.!",
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