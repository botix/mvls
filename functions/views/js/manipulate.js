const jarvis= document.querySelector(".jarvis-like")
const heroes = document.querySelector(".heroes")
const marked = document.querySelector(".marked")



let globalSettings ={
    paginationCounter: 0,
    requirePicture: true,
    requireDescription: false,
    offset: 0,
}

console.log(globalSettings.paginationCounter)

jarvis.addEventListener("click", (e) => {
    //e.stopPropagation()

    //const innerMost = document.querySelector(".jarvis_hover--red")
    //innerMost.classList.toggle("hide")
})

heroes.addEventListener("mouseover", (e)=>{
    // e.stopPropagation()
    // console.log(e)
})


