const express = require("express");
const router = express.Router();
const movie_obj = require("../db/movie_table")

router.get("/", async function (req, res, next) {
    console.log("Movie API V1");
    return res.json({
        'version': "v1"
    });
});

router.get("/get_all", async function (req, res, next) {
    console.log("Get All Called");

    const all_movies = await movie_obj.findAll();
    console.log(all_movies);
    return res.json(all_movies);

})

router.post("/add_recommendation", async function (req, res, next) {
    console.log("Adding new Recommendation");
    let row_details = req.body
    console.log("Adding row - " + row_details)
    const row = await movie_obj.create(row_details)
        .then(function (result) {
            return res.json({
                "result": true
            });
        })
        .catch(function (error) {
            return res.json({
                "result": error.message
            });
        });

})

module.exports = router;