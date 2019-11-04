
function checkIfLoggedIn(){
    firebase.auth().onAuthStateChanged(user => {
        if(user){
          console.log("User is logged in")
          //display random hero set from the database, 
          //check if user has any favorited heroes allready
          //if they do and they are among the random heros, highlight them
   

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