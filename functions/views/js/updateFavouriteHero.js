async function updateFavouriteHero(uniqueHeroId, heroName, heroImg){
    
    const database = firebase.firestore();
    const userId = firebase.auth().currentUser.uid

    const favHeroes = await getFavouriteHero()
    
    const itExistsInDatabase = 
        favHeroes.some(hero =>{
            return hero[0] === uniqueHeroId
        })
    
    if(itExistsInDatabase){
        database.collection(userId)
                .doc(uniqueHeroId)
                .delete()
        

    } else {
        database.collection(userId)
                .doc(uniqueHeroId)
                .set({
                    heroId: uniqueHeroId,
                    heroName: heroName,
                    heroImg: heroImg
                })
                .then(() =>{   
                    //call method to add favorite class to hero id div 
                    return null
                })
                .catch(err =>{
                     console.error(err)
                })
    } 

    globalSettings.favoriteHeroes = null
    globalSettings.favoriteHeroes = await getFavouriteHero()
}

async function getFavouriteHero(){
    const database = firebase.firestore();
    const userId = firebase.auth().currentUser.uid
    let resultArr = []

    await database.collection(userId).get()
            .then(snap =>{
                snap.forEach(doc => {
                    const result = doc.data()
                    resultArr.push(Object.values(result))
                })
            })
     
    return resultArr
}

