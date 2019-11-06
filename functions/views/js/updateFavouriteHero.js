async function updateFavouriteHero(uniqueHeroId){
    
    const database = firebase.firestore();
    const userId = firebase.auth().currentUser.uid

    const favouriteHeroes = await getFavouriteHero()
    
    const itExistsInDatabase = 
        favouriteHeroes.some(hero =>{
            return hero === uniqueHeroId
        })
   
    
    if(itExistsInDatabase){
        database.collection(userId)
                .doc(uniqueHeroId)
                .delete()

    } else {
        database.collection(userId)
                .doc(uniqueHeroId)
                .set({heroId: uniqueHeroId})
                .then(() =>{   
                    //call method to add favorite class to hero id div 
                    return null
                })
                .catch(err =>{
                     console.error(err)
                })
    } 
}

async function getFavouriteHero(){
    const database = firebase.firestore();
    const userId = firebase.auth().currentUser.uid
    let resultArr = []

    await database.collection(userId).get()
            .then(snap =>{
                snap.forEach(doc => {
                    const result = doc.data()
                    resultArr.push(Object.values(result)[0])
                    console.log(Object.values(result)[0])
                })
            })
     
    return resultArr
}

