function signInWithGoogle(){
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(googleAuthProvider)
            .then(data => {
                redirectAfterLogin(data)
                console.log("123")
                console.log(data.user.uid)
                return null;
            })
            .catch(err => {
                console.log(err)
            })
      
}

function redirectAfterLogin(data){
    ( async () => {
       const destination =
        await fetch("http://localhost:5000/home", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"uid": data.user.uid})
        });
       window.location.href = destination.url
      })();
}

