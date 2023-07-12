const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

  
module.exports = (app) => {
  app.get('/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        console.log("req param ici =>",req.params)
        if (pokemon === null) {
          const message = "Le pokémon demandé n'existe pas.Réessayez avec un autre identifiant.."
          return res.status(500).json( {message} )
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = `Le pokémon n'a pas pu etre récupérée.réessayez dans quelques instants.`
        res.status(500).json({message, data: error})
      })
  })
}