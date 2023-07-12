const express = require("express");
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize')

const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb();

// Ici les routes de nos points de terminaisons
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/findPokemonByType')(app);
require('./src/routes/login')(app);

// On ajoute la gestion des erreurs 404, ne pas oublier les accolades pour res et message
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez réessayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`App démarrée sur le port ${port}`));



















// const sequelize = new Sequelize(
//     'pokedex',
//     'root',
//     '',
//     {
//         host: 'localhost',
//         dialect: 'mariadb',
//         dialectOptions: {
//             timezone:'Etc/GMT-2'
//         },
//         logging: false
//     }
// );
// sequelize.authenticate()
//     .then(_ => console.log("Vous etes connecté à la base de donnée."))
//     .catch(err => console.log(`Impossible de se connecter ${err}`))

// const Pokemon = pokemonModel(sequelize, DataTypes);


// sequelize.sync({force: true})
//     .then(_ =>{ console.log('La base de données "Pokedex" à bien été synchronisée')
    
//     pokemons.map(pokemon =>{
//         Pokemon.create({
//             name: pokemon.name,
//             hp: pokemon.hp,
//             cp: pokemon.cp,
//             picture: pokemon.picture,
//             types: pokemon.types.join()
//         }).then(pokemons => console.log(pokemons.toJSON()))
//     } )

// })


// app.get("/", (req, res) => res.json("Hello toi !"));
// app.get("/pokemons", (req, res) => {
//     const message = "Liste complete : =>"
//     res.json(success(message, pokemons));  

// })
// app.get("/pokemons/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const pokemon = pokemons.find(pokemon => pokemon.id === id);
//     res.json(pokemon.name)
// })


// app.post('/pokemons', (req,res) => {
//     const id = 25
//     const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
//     pokemons.push(pokemonCreated)
//     const message = `Le pokemon ${pokemonCreated.name} a bien été ajouté`
//     res.json(success(message, pokemonCreated))
// })

// app.put("/pokemons/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const pokemonUpdated = {...req.body, id: id}
//     pokemons = pokemons.map(pokemon => {
//         return pokemon.id === id ? pokemonUpdated : pokemon
//     })
//     const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié`
//     res.json(success(message, pokemonUpdated))
// })

// app.delete('/pokemons/:id', (req,res) => {
//     const id = parseInt(req.params.id);
//     const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id);
//     pokemons = pokemons.filter(pokemon => pokemon.id !== id)
//     const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé`
//     res.json(success(message, pokemonDeleted))
// })

