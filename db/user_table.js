const {
    Sequelize,
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('./db_init')
const TABLE_NAME = "user"

const movie_row = sequelize.define(TABLE_NAME, {
    user_name: {
        type: Sequelize.STRING
    },
    email_id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    password:{
        type: Sequelize.STRING
    }
}, {
    // options
    timestamps: false,
    freezeTableName: true
});

movie_row.sync()

module.exports = movie_row