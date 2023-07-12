const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/pokemons',auth,  (req, res) => {
    if(req.query.name) {
      const name = req.query.name
      const limit =parseInt(req.query.limit) || 5

      if(name.length < 2) {
        const message = `2 caracteres mini.`
        res.status(400).json({message, })

      }
      return Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        },
        order: ['name'],
        limit: limit
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} pokémons qui correspondent à votre recherche ${name}.`
        res.json({ message, data: rows })
      })
    } else {
      Pokemon.findAll({order: ['name']})
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `La liste de pokémons n'a pas pu etre récupérée.réessayez dans quelques instants.`
        res.status(500).json({message, data: error})
      })
    }

  })
}