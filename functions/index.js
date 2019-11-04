const express = require ("express");

const admin = require("firebase-admin")
const functions = require('firebase-functions');

const serviceAccount= require("./marvelousproject-b02cb-firebase-adminsdk-1mvie-b8edfd96ad.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });


let database = admin.firestore();
const app = express();

express.json({limit : "1mb"}); 
app.set("view engine", "ejs")
app.use(express.static("views"))
app.set("views", __dirname + "/views")




// app.use((req, res, next) => { 
//     console.log("body", req.body.uid)      
//     if(!req.body.uid) {     
//         res.redirect('/login');
//     } else {
        
//         next();
//     }
// });

// app.get('/login', (req, res) => {  
//     res.render("login.ejs");   
// });

// app.get("/favouriteHeroes", (req, res) =>{
//     const heroRef = database.ref("/HcpCdkoBG9eDQStwBQl8ZxRdY4I2")
    
//     heroRef.once("value", snapshot =>{
//         res.render("favouriteHeroes.ejs", {favouriteHeroes: snapshot.val()})
//     })
// })

app.get("/a", (req, res)=>{
    res.set("Cache-Control", "public, max-age-300, s-maxage-600")
    console.log("HEEEELOOOO")

    res.render("home.ejs")
})



app.post("/marvel", (req, res)=>{
})


app.get("/test",  (req, res) =>{
    let arr = [];
    try{
        
        database.collection("HcpCdkoBG9eDQStwBQl8ZxRdY4I2")
            .get()
            .then(snap => snap.forEach(doc => console.log(doc.data())))
            .catch(err => console.log(err))
           
    }
    catch(err){
        console.error(err)
        res.send("er")
    }
    
    res.send(arr)
})



app.use("/requestHeroes",  require("./routes/requestHeroes"))

exports.app = functions.https.onRequest(app);
