const functions = require('firebase-functions');
const express = require ("express");

const app = express();

express.json({limit : "1mb"}); 

app.set("view engine", "ejs")

app.use(express.static("views"))

app.set("views", __dirname + "/views")

app.get("/timestamp", (req, res)=>{
    res.send(`${Date.now()}`)
});

app.get("/timestamp-cached", (req, res) =>{
    res.set("Cache-Control", "public, max-age-300, s-maxage-600")
    res.send(`${Date.now()}`)
})

app.get("/marvel", (req, res)=>{
    res.render("home.ejs")
})

app.post("/marvel", (req, res)=>{
    res.render("loggedIn")
    console.log("Recieved")
})

exports.app = functions.https.onRequest(app);
