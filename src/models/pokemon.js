const validTypes = ["Plante", "Poison", "Feu", "Eau", "Insecte", "Vol", "Normal", "Electrik", "Fée"];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est deja pris.'
        },
        validate: {
          notEmpty: {msg: "Vous devez renseigner ce champs"},
          notNull: {msg : "Le nom est une propriété requise "}
          }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: "Utilisez uniquement des nombres entiers pour les points de vie" },
          min: {
            args: [0],
            msg: "Les points de vie doivent être superieurs opu égales à 0"
          },
          max: {
            args: [999],
            msg: "Les points de vie doivent être inferieurs opu égales à 999"
          },
          notNull: {msg : "Les points de vie sont une propriété requise "}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {msg : "Les CP sont une propriété requise "},
          min: {
            args: [0],
            msg: "Les points d'attaque' doivent être superieurs opu égales à 0"
          },
          max: {
            args: [99],
            msg: "Les points d'attaque doivent être inferieurs opu égales à 99"
          },
          isInt: {msg : "Les cp doivent etre une valeur numérique"}
          }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {msg: "Vous devez ici insérer une URL valide"},
          notNull: {msg : "Les pictures sont une propriété requise "}
          }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('types').split(',')
        },
        set(types) {
            this.setDataValue('types', types.join())
        },
        validate: {
          isTypesValid(value) {
            if(!value) {
              throw new Error('Un pokémon doit au moins avoir un type.')
            }
            if (value.split(',').length > 3){
              throw new Error('Un pokémon ne peut pas avoir plus de 3 types.')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)) {
                throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
              }
            })
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }