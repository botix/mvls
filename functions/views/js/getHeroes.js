

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

async function getHeroes(flag = false){
    var userId = firebase.auth().currentUser.uid
    if(!userId) return true;

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

    if(flag){ 
        console.log("1", validatedHeroes)
        return validatedHeroes
        
    }

    return displayHeroes(validatedHeroes)

}


function displayHeroes(validatedHeroes){
    
    let data = validatedHeroes
    console.log(data)
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
            console.log(displayCondition1, displayCondition2)
            data.forEach( async(hero,index) =>{

                if(displayCondition2 > data.length-1 && index === data.length-1){ 
                    resetDisplayVariables()
                    console.log("Hey", data)
                    data = "await new data"
                    data = await getHeroes(true)
                    console.log(data)
                    
                } 

                if(index >= displayCondition1  && index < displayCondition2){
        
                    const heroCard = document.createElement("div")
                    const imageUrl = `${hero.path}/portrait_xlarge.jpg`
                    heroCard.innerHTML =  ` 
                        <div class="card-container" id ="${hero.id}">
                            <img
                            alt="http://marvel.com"
                            src=${imageUrl}
                            />
                            <h5 > ${hero.name}</h5>
                            <p> ${hero.description} </p>
                            </div>`
                    
                    display.appendChild(heroCard)
                } 
            });  
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

