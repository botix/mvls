const express = require ("express");
const path = require('path');
const admin = require("firebase-admin")
const functions = require('firebase-functions');
const serviceAccount= require("./marvelousproject-b02cb-firebase-adminsdk-1mvie-b8edfd96ad.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const requestHeroes = require("./routes/requestHeroes")


const app = express();

express.json({limit : "1mb"}); 
app.set("view engine", "ejs")
app.use(express.static("views"))
app.set('views', path.join(__dirname, 'views')); 

app.get('/login', (req, res) => {
    res.set("Cache-Control", "public, max-age-300, s-maxage-600")
    res.render("login.ejs");   
   });

// app.use( (req, res, next) => {
//     if(!req.body.uid){
//         res.redirect("/login")
//     } else {
//         next()
//     }
// })

app.post("/home", (req, res)=>{
  
    res.redirect("/app")
})

app.get("/app", (req, res)=>{
    console.log("3",req.body.uid)
    res.set("Cache-Control", "public, max-age-300, s-maxage-600")
    res.render("home.ejs")
})

app.use("/requestHeroes", requestHeroes)


exports.app = functions.https.onRequest(app);
