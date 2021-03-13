const movie_api_routes = require("./routes/movie_api_v1");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use("/movie_api_v1", movie_api_routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Server starting on port ${PORT}`)
});