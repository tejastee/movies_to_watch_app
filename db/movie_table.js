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
    status:{
        type: Sequelize.STRING
    },
    user:{
        type: Sequelize.STRING,
        primaryKey: true
    },
    created:{
        type:Sequelize.DATE
    },
    suggested_by: {
        type: Sequelize.STRING
    }
}, {
    // options
    timestamps: false,
    freezeTableName: true
});

movie_row.sync()

module.exports = movie_row