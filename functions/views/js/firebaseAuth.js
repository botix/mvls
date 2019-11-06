const navigateLeft = document.querySelector(".pagination_left")
const navigateRight= document.querySelector(".pagination_right")
const exit = document.querySelector(".exit")

let globalSettings ={
    paginationCounter: 0,
    requirePicture: true,
    requireDescription: false,
    offset: 0,
    favoriteHeroes: [],
}

function checkIfLoggedIn(){
    firebase.auth().onAuthStateChanged(async (user) => {
        if(user){

        const displayObject = await getHeroes()
        function updateView(){
            displayObject.clearDisplay()
            displayObject.renderHeroes()
            displayObject.highlightFavorites()
        }

        updateView()
      
        navigateLeft.addEventListener("click", (e) =>{
           e.stopPropagation();
           globalSettings.paginationCounter--;
           globalSettings.paginationCounter < 0 ? globalSettings.paginationCounter = 0 : globalSettings.paginationCounter
           
           updateView()
       })
       
       navigateRight.addEventListener("click", (e) =>{
           e.stopPropagation();
           globalSettings.paginationCounter++;
           
           updateView()
       })
    
       exit.addEventListener("click", e =>{
           e.stopPropagation()
           signOut()
       })
    
       const heroCard = document.querySelector(".display_container")
       heroCard.addEventListener("click", (e) =>{
           e.stopPropagation()
           const uniqueHeroId = e.target.id

           if(uniqueHeroId){
                updateFavouriteHero(uniqueHeroId)
           }
       })
    
        

        } else {
            console.log("User should log in to interact with the site")
            
            //Instruct user to login 
            window.location.href=("http://localhost:5000/login")
            
        }
    })
}

function signOut(){
    firebase.auth().signOut()
}


window.onload = () => checkIfLoggedIn()

