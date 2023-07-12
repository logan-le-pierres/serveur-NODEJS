const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

  
module.exports = (app) => {
  app.post('/pokemons', auth, (req, res) => {
    console.log("La requetes ici => : ", req)
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({message: error.message, data: error})
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = `La liste de pokémons n'a pas pu etre ajouté, réessayez dans quelques instants.`
        res.status(500).json({message, data: error})
      }) 
  })
}