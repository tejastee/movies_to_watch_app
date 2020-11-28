const {
    Sequelize,
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('./db_init')
const TABLE_NAME = "movies"

const movie_row = sequelize.define(TABLE_NAME, {
    movie_name: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    suggested_by: {
        type: Sequelize.STRING
    }
}, {
    // options
    timestamps: false
});

movie_row.sync()

module.exports = movie_row