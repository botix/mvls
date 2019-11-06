

function calculateScreenSize(){

    const screenHeight = window.screen.availHeight
    const screenWidth = window.screen.availWidth

    //usable
    const avHeight = screenHeight * 0.55;
    const avWidth = screenWidth * 0.85;

    const fitVerticaly = avHeight / 225;
    const fitHorizontaly = avWidth / 150
   
    return Math.floor(fitVerticaly)*Math.floor(fitHorizontaly)

}

async function getHeroes(returnOnlyValidatedData = false){
    var userId = firebase.auth().currentUser.uid
    if(!userId) return true;

    globalSettings.favoriteHeroes = await getFavouriteHero()

    let heroesToDisplay = null;
    heroesToDisplay =
        await fetch("http://localhost:5000//requestHeroes", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uid": userId,
                "limit": 100,
                "offset": globalSettings.offset
                })
            })
            .then(response => response.json())
            .then(data => data) 
            .catch(err =>{
                console.log(err)
            })
     
    const validatedHeroes = validateHeroes(heroesToDisplay)

    if(returnOnlyValidatedData){
        return validatedHeroes
    }

    return displayHeroes(validatedHeroes)

}


function displayHeroes(validatedHeroes){
    
    let data = validatedHeroes
    const backupData = validatedHeroes
   

    const display = document.querySelector(".display_container")
    const limit = calculateScreenSize()

    return {
        
        clearDisplay(){
            while (display.firstChild) {
                display.removeChild(display.firstChild);
              }
        },

        renderHeroes(){
            const displayCondition1 = limit * globalSettings.paginationCounter
            const displayCondition2 = limit * (globalSettings.paginationCounter + 1)

            if(globalSettings.renderFavorites === true){
                data = updateFavouriteHeroData()
               
            }else{
                data = backupData
            }
            
            data.forEach(async(hero,index) =>{
               
                if(displayCondition2 > data.length-1 && 
                    index === data.length-1 && 
                    globalSettings.renderFavorites == false) 
                {
                    resetDisplayVariables()
                    data = "await new data"
                    data = await getHeroes(true)
                } 

                if((index >= displayCondition1  && 
                    index < displayCondition2) || 
                    globalSettings.renderFavorites === true){
        
                    const heroCard = document.createElement("div")
                    let imageUrl = globalSettings.renderFavorites === false ?
                                     `${hero.path}/portrait_xlarge.jpg` : hero.path
                                    
                    heroCard.innerHTML =  ` 
                        <div class="card_container">
                            <img
                            id ="${hero.id}"
                            class="hero_image" 
                            alt="http://marvel.com"
                            name = "${hero.name}"
                            src= ${imageUrl}
                            />
                            <h5>${hero.name}</h5>
                            <p> ${hero.description} </p>
                            </div>`
                    
                    display.appendChild(heroCard)
                } 
           
            });  
        },

       async refreshFavorites(){
            globalSettings.favoriteHeroes = await getFavouriteHero()
        }
    }
}

function validateHeroes(data){
    
    let validatedHeroes = [];

    data.forEach(hero =>{
            const noPicture = hero.path.match(/image_not_available/i)
            if(!noPicture){
                validatedHeroes.push(hero)
            }
        })

    return validatedHeroes  
}

function resetDisplayVariables(){
    globalSettings.paginationCounter = 0;
    globalSettings.offset += 100
}

function updateFavouriteHeroData(){
    let favoriteHeroes =[]

    globalSettings.favoriteHeroes.forEach(hero =>{
        favoriteHeroes.push({
            id: hero[0],
            name:hero[2],
            description:"",
            path:hero[1]
        })
    })
    
    return favoriteHeroes;
}

