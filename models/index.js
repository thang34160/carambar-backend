const { Sequelize } = require('sequelize');

// Configuration de la base de données SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

// Import du modèle Blague
const Blague = require('./Blague')(sequelize, Sequelize.DataTypes);

module.exports = {
    sequelize,
    Blague
};
