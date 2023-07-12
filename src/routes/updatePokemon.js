const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

  
module.exports = (app) => {
  app.put('/pokemons/:id', auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      // En mettant un return juste en dessous on premet de ne pas avoir à réecrire le code permettant de catcher les erreurs
      return Pokemon.findByPk(id).then(pokemon => {
        if (pokemon === null) {
          const message = "Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.."
          return res.status(404).json( {message} )
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error => {
      if (error instanceof ValidationError) {
        return res.status(400).json({message: error.message, data: error})
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = `La liste de pokémons n'a pas pu etre récupérée. Réessayez dans quelques instants.`
      res.status(500).json({message, data: error})
    })
  })
}