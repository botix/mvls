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
    isNavigationVisible: true,
    production: false,
    localRoute: "http://localhost:5000",
    productionRoute: "https://marvelousproject-b02cb.firebaseapp.com", 
}

const useRoute = globalSettings.production ? globalSettings.productionRoute : globalSettings.localRoute

function checkIfLoggedIn(){
    firebase.auth().onAuthStateChanged(async (user) => {
        if(user){

            let displayObject = await getHeroes()

            const updateView = () => {
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
               
                if(!globalSettings.renderFavorites){
                    toggleNavigationButtons()
                }
                globalSettings.renderFavorites = true
                globalSettings.isNavigationVisible = false

                updateView()
            })
            
            allHeroes.addEventListener("click", async (e)=>{
                e.stopPropagation()
                
                if(!globalSettings.isNavigationVisible){
                    toggleNavigationButtons()
                    globalSettings.renderFavorites = false
                    globalSettings.isNavigationVisible = true
                }
                

                updateView()
            })

            

        } else {
            
            window.location.href=(`${useRoute}/login`)
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

