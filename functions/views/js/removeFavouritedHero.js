function removeFavHero(uniqueHeroId){

    var database = firebase.firestore();
    var userId = firebase.auth().currentUser.uid

    database.collection(userId).doc(uniqueHeroId).delete()


}