const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DATABASE_URL;

const {
  Client
} = require('pg');

// console.log("DB Url - "+process.env.DATABASE_URL);
const client = new Client({
  connectionString: DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();


app.get('/', (req, resp) => {


  client.query('SELECT * FROM movies;', (err, res) => {
    if (err) throw err;
    let str = "";
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
      str = str + JSON.stringify(row);
    }
    // client.end();
    resp.send('Hello World!' + str);
  });

})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})