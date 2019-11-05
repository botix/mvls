const navigateLeft = document.querySelector(".pagination_left")
const navigateRight= document.querySelector(".pagination_right")
const exit = document.querySelector(".exit")

function checkIfLoggedIn(){
    firebase.auth().onAuthStateChanged(async (user) => {
        if(user){
          console.log("User is logged in")
          //display random hero set from the database, 
          //check if user has any favorited heroes allready
          //if they do and they are among the random heros, highlight them
         const displayObject = await getHeroes()
         displayObject.renderHeroes()
      
         navigateLeft.addEventListener("click", (e) =>{
            e.stopPropagation();
            globalSettings.paginationCounter--;
            globalSettings.paginationCounter < 0 ? globalSettings.paginationCounter = 0 : globalSettings.paginationCounter
            //getHeroes()
            displayObject.clearDisplay()
            displayObject.renderHeroes()
        })
        
        navigateRight.addEventListener("click", (e) =>{
            e.stopPropagation();
            globalSettings.paginationCounter++;
            //getHeroes()
            displayObject.clearDisplay()
            displayObject.renderHeroes()
        })

        exit.addEventListener("click", e =>{
            e.stopPropagation()
            signOut()
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


