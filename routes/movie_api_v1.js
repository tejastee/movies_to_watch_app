const express = require("express");
const router = express.Router();
const movie_obj = require("../db/movie_table")
const user_obj = require("../db/user_table")
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const accessTokenSecret = "$q3423dsjfkjgkdbg";

const authenticateJWT = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, details) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log("Auth JWT",details.email);
            req.email = details.email
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

router.get("/", async function (req, res, next) {
    console.log("Movie API V1");
    return res.json({
        'version': "v1"
    });
});

router.get("/get_all", authenticateJWT ,async function (req, res) {
    console.log("Get All Called on ", req.email);
    email = req.email;
    const all_movies = await movie_obj.findAll({where: {user:email}});
    // console.log(all_movies);
    return res.json(all_movies);

})

router.post("/add_recommendation", authenticateJWT ,async function (req, res) {
    console.log("Adding new Recommendation");
    let row_details = req.body
    
    let already_exist = await movie_obj.findOne({where:{movie_name:row_details.movie_name}});
    console.log("Reco - ", already_exist, " - ", row_details.movie_name);
    if(already_exist === null){
        let email = req.email
        row_details["user"] = email
        row_details["created"] = new Date(Date.now())
        console.log("Adding row - " + row_details)
        console.log(JSON.stringify(row_details, null, 2));
        movie_obj.create(row_details)
        return res.status(200).send("Added !")
    }

    return res.status(204).send("Movie Already Exists!")
   
    

})

router.post("/login", async function(req, res){
    var email = req.body.email;
    var pass = req.body.password;
    let user = await user_obj.findOne({where: {email_id:email}});
    if(user === null){
        return res.status(400).send('Cannot find user')
    }

    if(await bcrypt.compare(pass, user.password)) {
        const access_token = jwt.sign({email:email}, accessTokenSecret, {});
        return res.status(202).json({access_token});
      } else {
        return res.status(403).send('Wrong Password!')
      }
})

router.post("/register", async function(req, res){
    var username = req.body.username;
    var pass = req.body.password;
    var email = req.body.email;

    console.log("Registering a new user !", username, " - ", "pass - ", pass, " - ",email);

    let user_exists = await user_obj.findOne({where: {email_id:email}});
    if(user_exists === null){
        console.log("Create !")

        const hashedPassword = await bcrypt.hash(pass, saltRounds);
        const new_user = { user_name:username, email_id:email, password:hashedPassword };
        console.log(new_user);
        user_obj.create(new_user);
        return res.status(201).send("Created Successfully!")
    }
    else{
        console.log("Already Exists !")
        return res.status(400).send("User already exists!");
    }

})

module.exports = router;