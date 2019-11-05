function displayHeroes(data){
     
  const display = document.querySelector(".display_container")
  const limit = calculateScreenSize()
  const displayCondition1 = limit * globalSettings.paginationCounter
  const displayCondition2 = limit * (globalSettings.paginationCounter + 1)
  
  while (display.firstChild) {
      display.removeChild(display.firstChild);
    }

  
  data.forEach( (hero,index) =>{
      if(index === 99) getHeroes()
      if(index > displayCondition1  && index < displayCondition2){

          const heroCard = document.createElement("div")
          const imageUrl = `${hero.path}/portrait_xlarge.jpg`
          heroCard.innerHTML =  ` 
              <div class="card-container" id ="${hero.id}">
                  <img
                  alt="http://marvel.com"
                  src=${imageUrl}
                  />
                  <h5 > ${hero.name}</h5>
                  <p> ${hero.description} </p>
                  </div>`
          
          display.appendChild(heroCard)
      } 
  });  
}