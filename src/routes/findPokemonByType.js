const { Pokemon } = require('../db/sequelize')
const Sequelize = require('sequelize');

  
module.exports = (app) => {
  app.get('/pokemons/type/:type', (req, res) => {
    const { type } = req.params;

    Pokemon.findAll({
      where: {
        types: {
          [Sequelize.Op.like]: `%${type}%`
        }
      }
    })
      .then(pokemons => {
        if (pokemons.length === 0) {
          const message = `Aucun Pokémon de type "${type}" trouvé.`;
          return res.status(404).json({ message });
        }

        const message = `Pokémons de type "${type}":`;
        res.json({ message, data: pokemons });
      })
      .catch(error => {
        const message = `Une erreur s'est produite lors de la recherche de Pokémon par type.`;
        res.status(500).json({ message, data: error });
      });
  })
}