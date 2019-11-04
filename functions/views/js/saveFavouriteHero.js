function saveFavouriteHero(uniqueHeroId){

    var database = firebase.firestore();
    var userId = firebase.auth().currentUser.uid

    database.collection(userId).doc(uniqueHeroId).set({heroId: uniqueHeroId})
        .then(() =>{
            window.location.reload()
            return null
        })
        .catch(err =>{
            console.error(err)
        })

    // var database = firebase.database();
    // var userId = firebase.auth().currentUser.uid

    // var heroRef = database.ref(`/${userId}`)
    // var newHero = heroRef.push()

    // newHero.set({"heroId": uniqueHeroId}, merge = true)
    //     .then(() =>{
    //         window.location.reload()
    //         return null
    //     })
    //     .catch(err =>{
    //         console.error(err)
    //     })
}

