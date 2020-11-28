const Sequelize = require('sequelize');

const DB_URL = process.env.DATABASE_URL;
const sequelize = new Sequelize(DB_URL);

sequelize.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});

module.exports = sequelize