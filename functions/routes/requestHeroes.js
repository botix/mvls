const express = require("express")
const fetchUrl = require("fetch").fetchUrl
const createRequest = require("../api/createRequest")

const router = express.Router()

router.get("/", async (req, res)=>{
   
    // in the request, as the user is traversing the pages on the frontend, send limit and offset data
    const apiEndpoint = "v1/public/characters"
    const { limit, offset } = req.body 
    const destination = createRequest(apiEndpoint)

    await fetchUrl(destination, function(error, meta, body){
        
        const parsedResponse = JSON.parse(body)
        let arrayOfHeroes = []

        parsedResponse.data.results.forEach(hero =>{

            const heroCredentials = {
                "id": hero.id,
                "name": hero.name,
                "description": hero.description,
                "path": hero.thumbnail.path
            }

            database.collection("Superheroes").doc(`${hero.id}`).set(heroCredentials)
            arrayOfHeroes.push(heroCredentials)
        })    
    })
    
    //send a response rendering the page for the user using ejs
})


module.exports = router