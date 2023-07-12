const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

  
module.exports = (app) => {
  app.delete('/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if (pokemon === null) {
        const message = "Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.."
        return res.status(404).json( {message} )
      }
      const pokemonDeleted = pokemon;
      Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
      
    })
    .catch(error => {
      const message = `La liste de pokémons n'a pas pu etre supprimé. Réessayez dans quelques instants.`
      res.status(500).json({message, data: error})
    })
  })
}