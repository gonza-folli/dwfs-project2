window.onload = () => {

    let night = document.getElementById('modo-nocturno')
    let body = document.getElementsByTagName('body')
    let imgLogoDesktop = document.getElementById('logodesktop')
    let imgLogoMobile = document.getElementById('logomobile')
    let imgBurger = document.getElementById('burger')
    let imgIconSearch = document.getElementById('icon-search')
    let imgMoreResultsIcon = document.getElementById('moreResultsIcon')
    let buttonLeft = document.getElementById('buttonLeft')
    let buttonRight = document.getElementById('buttonRight')
    let imgZoomGifClose = document.getElementById('zoomGifClose')
    let flag = localStorage.getItem("Nocturne Mode") ? JSON.parse(localStorage.getItem("Nocturne Mode")) : true
    let flagBurger = 0
    console.log(flag)
    //------------------------------MODO NOCTURNO------------------------------------------------
    if (flag == false) {
        body[0].classList.add('night')
        nightImgRender ()
        night.innerHTML = "MODO DIURNO"}
        else {night.innerHTML = "MODO NOCTURNO"
    }
    

         // BOTON ACTIVAR MODO NOCTURNO
    night.addEventListener('click', () => {
        flag = !flag
        localStorage.setItem('Nocturne Mode', flag)
        nightTagRender()
        nightImgRender()
        if (flag == false) {
        night.innerHTML = "MODO DIURNO"} else {night.innerHTML = "MODO NOCTURNO"}
    })
      
        // FUNCION RENDERIZAR TAG
    function nightTagRender () {
        body[0].classList.toggle('night')
    }
            // FUNCION RENDERIZAR IMAGENES
    function nightImgRender () {
        if (flag == false) {
        imgLogoDesktop.setAttribute('src', './assets/Logo-modo-noc.svg')
        imgLogoMobile.setAttribute('src', './assets/logo-mobile-modo-noct.svg')
        imgIconSearch.setAttribute('src', './assets/icon-search-modo-noct.svg')
        imgBurger.setAttribute('src', './assets/close-modo-noct.svg')
        imgMoreResultsIcon.setAttribute('src', './assets/CTA-ver+-modo-noc.svg')
        buttonLeft.setAttribute('src', './assets/button-slider-left-md-noct.svg')
        buttonRight.setAttribute('src', './assets/button-slider-right-md-noct.svg')
        imgZoomGifClose.setAttribute('src', './assets/close-modo-noct.svg')
        } else {
            imgLogoDesktop.setAttribute('src', './assets/logo-desktop.svg')
            imgLogoMobile.setAttribute('src', './assets/logo-mobile.svg')
            imgIconSearch.setAttribute('src', './assets/icon-search.svg')
            imgBurger.setAttribute('src', './assets/close.svg')
            imgMoreResultsIcon.setAttribute('src', './assets/CTA-ver-mas.svg')
            buttonLeft.setAttribute('src', './assets/button-slider-left.svg')
            buttonRight.setAttribute('src', './assets/Button-Slider-right.svg')
            imgZoomGifClose.setAttribute('src', './assets/close.svg')
        }
    }

    imgBurger.addEventListener('click', () => {
        if (flagBurger == 0 && flag == true){
            imgBurger.setAttribute('src', './assets/close.svg')
            return flagBurger = 1}
            else if (flagBurger == 1 && flag == true) {
                imgBurger.setAttribute('src', './assets/burger.svg')
                return flagBurger = 0}
                else if (flagBurger == 1 && flag == false) {
                    imgBurger.setAttribute('src', './assets/burger-modo-noct.svg')
                    return flagBurger = 0}
                    else if (flagBurger == 0 && flag == false) {
                        imgBurger.setAttribute('src', './assets/close-modo-noct.svg')
                        return flagBurger = 1}
                }
    )


//------------------------------FETCH------------------------------------------------
    
    let urlPath = "https://api.giphy.com/v1/gifs"
    let apiKey = "1MDqvbtJKgdp21ND6twL1o2xpVnN9hLQ"
    let apiKey2 = "DjElvlwE1GAAFq1RVpDkjCpWZfhT1c1a"
    
// ---------------------- SEARCH BAR -------------------------------------------------
    let inputSearchBar = document.getElementById('searchBar')
    let searchBarLimit = 12
    let searchResults = document.getElementById('searchResults')
    let startingPosition = 0
    let separateSearch = document.getElementById('separateSearch')
    let autocomplete = document.getElementById('autocomplete')
    let trendingHome = document.getElementById('trending-home')
    let searchResultsTitle = document.getElementById('searchResultsTitle')
    let moreResults = document.getElementById('moreResults')
    let favoritesGif = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : []
    let zoomGif = document.getElementById('zoomGif')

    imgIconSearch.addEventListener('click', () =>{
        cleanResults()
        trendingHome.style.display = "none"
        searchBar = document.getElementById('searchBar').value
        console.log(searchBar)
        renderSearchTitle(searchBar)
        searchGifos(searchBar)
        inputSearchBar.value = ""
    })
    inputSearchBar.addEventListener('keyup', (e) => {
        searchBar = document.getElementById('searchBar').value
        console.log(searchBar)
        autocompleteSearch (searchBar)
        if (e.keyCode === 13 && searchBar !== "") {
            cleanResults()
            trendingHome.style.display = "none"
            renderSearchTitle(searchBar)
            searchGifos(searchBar)
            inputSearchBar.value = ""
        }
    })
    
    async function autocompleteSearch (searchBar) {
        let response = await fetch(`${urlPath}/search/tags?api_key=${apiKey2}&q=${searchBar}&limit=4&offset=0&rating=g&lang=en`)
        response = await response.json()
        // console.log(response)
        renderAutocompleteSearch (response)
    }

    function renderAutocompleteSearch (response) {
        let li = document.querySelectorAll('.autoc')
        separateSearch.style.display= "block"
        autocomplete.style.display = "flex"
        for (let i = 0; i < response.data.length; i++) {
            li[i].style.display= "block"
            li[i].setAttribute('id', `result${i}`)
            li[i].innerHTML = `<img src="./assets/icon-search.svg" alt="suggestedSearch" class="iconSuggestedSearch">${response.data[i].name}`
            // li[i].addEventListener('click', () => {
            //     let selectedLi = li[i].textContent
            //     console.log(selectedLi)
            //     console.log(inputSearchBar.value)
            //     inputSearchBar.value == `${selectedLi}`
            // })

            // let li = document.createElement('li')
            // li.innerHTML = `<img src="./assets/icon-search.svg" alt="suggestedSearch" class="iconSuggestedSearch">${response.data[i].name}`
            // autocomplete.appendChild(li)
            // console.log(li)
        }
        
        if (inputSearchBar.value == "") {
            separateSearch.style.display= "none"
            autocomplete.style.display = "none"
        }
    }

    function cleanResults () {
        while (searchResults.childNodes.length > 0) {
            searchResults.removeChild(searchResults.lastChild);
        }
    }

    function renderSearchTitle (searchBar) {
        searchResultsTitle.innerHTML = `${searchBar}`
        searchResultsTitle.style.display = "block"
        searchResults.style.display = "flex"
        moreResults.style.display = "block"
    }

    async function searchGifos (searchBar) {
        let response = await fetch(`${urlPath}/search?api_key=${apiKey2}&q=${searchBar}&limit=${searchBarLimit}&offset=${startingPosition}&rating=g&lang=en`)
        response = await response.json()
        console.log(response)
        renderGif(response, searchResults)
    }
    
    function renderGif (response, container) {
        for (let i = 0; i < response.data.length; i++) {
            let newDiv = document.createElement('div')
            newDiv.classList.add('containerGif')
            container.appendChild(newDiv)
            let newItem = document.createElement('img')
            newItem.setAttribute('src', `${response.data[i].images['original'].url}`)
            newItem.setAttribute('class', `img`)
            newItem.setAttribute('id', `img${[i]}`)
            newDiv.appendChild(newItem)
            let newDivHover = document.createElement('div')
            newDivHover.classList.add('containerGifSelected')
            newDivHover.innerHTML = 
            `<div class="icons">
                <button class="icon Fav" id="Fav-${response.data[i].id}" type="button"><img src="./assets/icon-fav.svg" alt="fav"></button>
                <button class="icon Des" id="Des-${response.data[i].id}" type="button"><img src="./assets/icon-download.svg" alt="des"></button>
                <button class="icon Zoom" id="Zoom-${response.data[i].id}" type="button"><img src="./assets/icon-max-normal.svg" alt="max"></button>
            </div>
            <div class="text">
                <span>User</span>
                <span>${response.data[i].title}</span>
            </div>`
            newDiv.appendChild(newDivHover)


            let buttonFav = document.getElementById(`Fav-${response.data[i].id}`)
            buttonFav.addEventListener('click', () => {
                console.log(response.data[i].title)
                favoritesGif.push(response.data[i])
                localStorage.setItem('favorites', JSON.stringify(favoritesGif))
            })

            let buttonZoom = document.getElementById(`Zoom-${response.data[i].id}`)
            buttonZoom.addEventListener('click', () => {
                let clone = newItem.cloneNode(true)
                let clone2 = newDivHover.cloneNode(true)
                zoomGif.appendChild(clone)
                zoomGif.appendChild(clone2)
                zoomGif.style.display = "flex"
            })
        }
    }
    
    let zoomGifClose = document.getElementById('zoomGifClose')
        zoomGif.addEventListener('click', () => {
                while (zoomGif.childNodes.length > 2) {
                    zoomGif.removeChild(zoomGif.lastChild);
                }
                zoomGif.style.display = "none"
    })

//------------------------------MAS RESULTADOS------------------------------------------------

    moreResults.addEventListener('click', () => {
        startingPosition = startingPosition + 12
        searchGifos(searchBar)
    })

//------------------------------TRENDING------------------------------------------------
    let scrollSon = document.getElementById('scroll-son')

    async function getTrending () {
        let response = await fetch(`${urlPath}/trending?api_key=${apiKey2}&limit=3&rating=g`)
        response = await response.json()
        console.log(response)
        return response
    }
    getTrending().then(
        (response) => {
            renderGif(response, scrollSon)
            renderTrendingTitle(response)
        }
    )
    function renderTrendingTitle (response) {
        let newItem = document.createElement('p')
        newItem.classList.add('trending-p')
        newItem.innerHTML = `${response.data[0].title},${response.data[1].title},${response.data[2].title}`
        trendingHome.appendChild(newItem)
    }
    
}