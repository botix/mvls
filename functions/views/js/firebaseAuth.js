const navigateLeft = document.querySelector(".pagination_left")
const navigateRight= document.querySelector(".pagination_right")
const jarvis= document.querySelector(".jarvis-like")
const allHeroes = document.querySelector(".heroes")
const myFavorites = document.querySelector(".marked")
const exit = document.querySelector(".exit")

let globalSettings ={
    paginationCounter: 0,
    requirePicture: true,
    requireDescription: false,
    offset: 0,
    favoriteHeroes: null,
    renderFavorites: false,
    isNavigationVisible: true
}

function checkIfLoggedIn(){
    firebase.auth().onAuthStateChanged(async (user) => {
        if(user){

            let displayObject = await getHeroes()

            function updateView(){
                displayObject.clearDisplay()
                displayObject.renderHeroes()
                displayObject.refreshFavorites()
            }

            updateView()
        
            navigateLeft.addEventListener("click", (e) =>{
                e.stopPropagation();
                globalSettings.paginationCounter--;
                globalSettings.paginationCounter < 0 ? globalSettings.paginationCounter = 0 : globalSettings.paginationCounter
                globalSettings.renderFavorites = false

                updateView()
            })
        
            navigateRight.addEventListener("click", (e) =>{
                e.stopPropagation();
                globalSettings.paginationCounter++;
                globalSettings.renderFavorites = false

                updateView()
            })
            
            exit.addEventListener("click", e =>{
                e.stopPropagation()
                signOut()
            })
            
            const heroCard = document.querySelector(".display_container")
            heroCard.addEventListener("click", async (e) =>{
                e.stopPropagation()
                const uniqueHeroId = e.target.id
                const heroName = e.target.name
                const heroImg = e.target.src

                if(uniqueHeroId){
                        await updateFavouriteHero(uniqueHeroId, heroName, heroImg)
                        updateView()
                }
            })
            
            myFavorites.addEventListener("click", async (e)=>{
                e.stopPropagation()
                globalSettings.renderFavorites = true

                toggleNavigationButtons()
                updateView()
            })
            
            allHeroes.addEventListener("click", async (e)=>{
                e.stopPropagation()
                globalSettings.renderFavorites = false
                
                if(globalSettings.isNavigationVisible){
                    toggleNavigationButtons()
                }
                updateView()
            })
        

        } else {
            window.location.href=("http://localhost:5000/login")
        }
    })
}

function signOut(){
    firebase.auth().signOut()
}

function toggleNavigationButtons(){
    navigateLeft.classList.toggle("hide")
    navigateRight.classList.toggle("hide")
}


window.onload = () => checkIfLoggedIn()

