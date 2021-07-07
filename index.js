window.onload = () => {

    let night = document.getElementById('modo-nocturno')
    let body = document.getElementsByTagName('body')
    let imgLogoDesktop = document.getElementById('logodesktop')
    let imgLogoMobile = document.getElementById('logomobile')
    let imgBurger = document.getElementById('burger')
    let imgIconSearch = document.getElementById('icon-search')
    let imgIconSearch2 = document.getElementById('icon-search2')
    let ImgIconSearchClose = document.getElementById('icon-search-close')
    let iconSuggestedSearch = document.querySelectorAll('.iconSuggestedSearch')
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
        imgIconSearch2.setAttribute('src', './assets/icon-search-modo-noct.svg')
        ImgIconSearchClose.setAttribute('src', './assets/close-modo-noct.svg')
        imgBurger.setAttribute('src', './assets/close-modo-noct.svg')
        imgMoreResultsIcon.setAttribute('src', './assets/CTA-ver+-modo-noc.svg')
        buttonLeft.setAttribute('src', './assets/button-slider-left-md-noct.svg')
        buttonRight.setAttribute('src', './assets/button-slider-right-md-noct.svg')
        imgZoomGifClose.setAttribute('src', './assets/close-modo-noct.svg')
        for (let i = 0; i < iconSuggestedSearch.length; i++) {
            iconSuggestedSearch[i].setAttribute('src', './assets/icon-search-modo-noct.svg')
        }
        } else {
            imgLogoDesktop.setAttribute('src', './assets/logo-desktop.svg')
            imgLogoMobile.setAttribute('src', './assets/logo-mobile.svg')
            imgIconSearch.setAttribute('src', './assets/icon-search.svg')
            imgIconSearch2.setAttribute('src', './assets/icon-search.svg')
            ImgIconSearchClose.setAttribute('src', './assets/close.svg')
            imgBurger.setAttribute('src', './assets/close.svg')
            imgMoreResultsIcon.setAttribute('src', './assets/CTA-ver-mas.svg')
            buttonLeft.setAttribute('src', './assets/button-slider-left.svg')
            buttonRight.setAttribute('src', './assets/Button-Slider-right.svg')
            imgZoomGifClose.setAttribute('src', './assets/close.svg')
            for (let i = 0; i < iconSuggestedSearch.length; i++) {
                iconSuggestedSearch[i].setAttribute('src', './assets/icon-search.svg')
            }
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

    // ------------- BUSCADOR CON EL "CLICK"  ( tengo 2 lupas)------------------
    imgIconSearch.addEventListener('click', () =>{
        if (inputSearchBar.value !== "") {
        cleanResults()
        trendingHome.style.display = "none"
        searchBar = document.getElementById('searchBar').value
        renderSearchTitle(searchBar)
        searchGifos(searchBar)
        inputSearchBar.value = ""
        renderIconSearchBar()
        }
    })
    imgIconSearch2.addEventListener('click', () =>{
        cleanResults()
        trendingHome.style.display = "none"
        searchBar = document.getElementById('searchBar').value
        renderSearchTitle(searchBar)
        searchGifos(searchBar)
        inputSearchBar.value = ""
        renderIconSearchBar()
        separateSearch.style.display= "none"
        autocomplete.style.display = "none"
    })
    // ------------- BUSCADOR CON EL "TECLADO" AUTOCOMPLETAR ------------------
    inputSearchBar.addEventListener('keyup', (e) => {
        searchBar = document.getElementById('searchBar').value
        renderIconSearchBar()
        autocompleteSearch (searchBar)
        if (e.keyCode === 13 && searchBar !== "") {
            cleanResults()
            trendingHome.style.display = "none"
            renderSearchTitle(searchBar)
            searchGifos(searchBar)
            inputSearchBar.value = ""
            renderIconSearchBar()
        }
    })
    // -----------------RENDERIZAR BOTONES BUSQUEDA-CIERRE DE LA SEARCH BAR-----------------
    function renderIconSearchBar () {
        if (inputSearchBar.value == "") {
            inputSearchBar.style.padding = "0 0 0 3.8%"
            imgIconSearch2.style.display = "none"
            ImgIconSearchClose.style.display= "none"
            imgIconSearch.style.display = "block"
        } else {
            inputSearchBar.style.padding = "0 0 0 9%"
            imgIconSearch2.style.display = "block"
            ImgIconSearchClose.style.display= "block"
            imgIconSearch.style.display = "none"
        }
    }

    // -----------------BOTON CIERRE PARA LIMPIAR BUSCARDOR-----------------
    ImgIconSearchClose.addEventListener('click', () => {
        inputSearchBar.value = ""
        separateSearch.style.display= "none"
        autocomplete.style.display = "none"
        ImgIconSearchClose.style.display = "none"
        imgIconSearch.style.display = "block"
    })

    // -----------    AUTOCOMPLETAR CON SUGERIDOS---------------------------------
    async function autocompleteSearch (searchBar) {
        let response = await fetch(`${urlPath}/search/tags?api_key=${apiKey}&q=${searchBar}&limit=4&offset=0&rating=g&lang=en`)
        response = await response.json()
        renderAutocompleteSearch (response)
    }

    let li = document.querySelectorAll('.autoc')
    let liSpan = document.querySelectorAll('.autocSpan')
    let selectedLi = 0

    function renderAutocompleteSearch (response) {
        separateSearch.style.display= "block"
        autocomplete.style.display = "flex"
        for (let i = 0; i < response.data.length; i++) {
            li[i].style.display= "block"
            li[i].setAttribute('id', `result${i}`)
            liSpan[i].innerHTML = `${response.data[i].name}`
            li[i].addEventListener('click', () => {
                selectedLi = li[i].textContent
                console.log(selectedLi)
                inputSearchBar.value = selectedLi
                separateSearch.style.display= "none"
                autocomplete.style.display = "none"
                renderIconSearchBar()
            })
        }
        if (inputSearchBar.value == "") {
            separateSearch.style.display= "none"
            autocomplete.style.display = "none"
        }
    }

    //------------- LIMPIAR GIF OBTENIDOS COMO RESULTADOS ----------------------
    function cleanResults () {
        while (searchResults.childNodes.length > 0) {
            searchResults.removeChild(searchResults.lastChild);
        }
    }

    // --------------------- RENDERIZAR TITULOS Y GIF --------------------------
    function renderSearchTitle (searchBar) {
        searchResultsTitle.innerHTML = `${searchBar}`
        searchResultsTitle.style.display = "block"
        searchResults.style.display = "flex"
        moreResults.style.display = "block"
    }

    async function searchGifos (searchBar) {
        let response = await fetch(`${urlPath}/search?api_key=${apiKey}&q=${searchBar}&limit=${searchBarLimit}&offset=${startingPosition}&rating=g&lang=en`)
        response = await response.json()
        console.log(response)
        renderGif(response, searchResults)
    }
// ------------------ FUNCION PRINCIPAL DE RENDERIZAR LOS GIF Y SUS BOTONES------------------------
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
                <button class="icon Fav" id="Fav-${response.data[i].id}" type="button"><img id="imgFav-${response.data[i].id}" class="imgButton" src="./assets/icon-fav.svg" alt="fav"><img id="imgFav2-${response.data[i].id}" class="imgButtonHover" src="./assets/icon-fav-hover.svg" alt="fav"></button>
                <button class="icon Des" id="Des-${response.data[i].id}" type="button"><img class="imgButton" src="./assets/icon-download.svg" alt="des"><img class="imgButtonHover" src="./assets/icon-download-hover.svg" alt="des"></button>
                <button class="icon Zoom" id="Zoom-${response.data[i].id}" type="button"><img class="imgButton" src="./assets/icon-max-normal.svg" alt="max"><img class="imgButtonHover" src="./assets/icon-max-hover.svg" alt="max"></button>
            </div>
            <div class="text">
                <span>${response.data[i].username}</span>
                <span>${response.data[i].title}</span>
            </div>`
            newDiv.appendChild(newDivHover)

            // ---------------------------- FUNCION FAVORITOS  ---------------------
            let buttonFav = document.getElementById(`Fav-${response.data[i].id}`)
            let imgFav = document.getElementById(`imgFav-${response.data[i].id}`)
            let imgFav2 = document.getElementById(`imgFav2-${response.data[i].id}`)
            checkFavorites(response.data[i], imgFav, imgFav2)
            
            buttonFav.addEventListener('click', () => {
                if (favoritesGif.map((x) => x.id).includes(response.data[i].id)) {
                    favoritesGif = favoritesGif.filter(function (x) {return x.id != response.data[i].id})
                    imgFav.setAttribute('src', './assets/icon-fav.svg')
                    imgFav2.setAttribute('src', './assets/icon-fav-hover.svg')
                } else {
                    favoritesGif.push(response.data[i])
                    imgFav.setAttribute('src', './assets/icon-fav-activev2.svg')
                    imgFav2.setAttribute('src', './assets/icon-fav-activev2.svg')
                }
                localStorage.setItem('favorites', JSON.stringify(favoritesGif))
                })
            // ---------- FUNCION ZOOM EN MODO MOBILE ---------------------
            newItem.addEventListener('click', () => {
                let clone = newItem.cloneNode(true)
                let clone2 = newDivHover.cloneNode(true)
                let buttonFavCloned = clone2.getElementsByClassName('icon Fav')[0]
                buttonFavCloned.addEventListener('click', () => {
                    let imgFavCloned = buttonFavCloned.getElementsByTagName('img')
                    if (favoritesGif.map((x) => x.id).includes(response.data[i].id)) {
                        favoritesGif = favoritesGif.filter(function (x) {return x.id != response.data[i].id})
                        imgFavCloned[0].setAttribute('src', './assets/icon-fav.svg')
                        imgFavCloned[1].setAttribute('src', './assets/icon-fav-hover.svg')
                    } else {
                        favoritesGif.push(response.data[i])
                        imgFavCloned[0].setAttribute('src', './assets/icon-fav-activev2.svg')
                        imgFavCloned[1].setAttribute('src', './assets/icon-fav-activev2.svg')
                    }
                    localStorage.setItem('favorites', JSON.stringify(favoritesGif))
                    })
                zoomGif.appendChild(clone)
                zoomGif.appendChild(clone2)
                zoomGif.style.display = "flex"
            })
            // ---------- FUNCION ZOOM EN MODO DESKTOP ---------------------
            let buttonZoom = document.getElementById(`Zoom-${response.data[i].id}`)
            buttonZoom.addEventListener('click', () => {
                let clone = newItem.cloneNode(true)
                let clone2 = newDivHover.cloneNode(true)
                let buttonFavCloned = clone2.getElementsByClassName('icon Fav')[0]
                buttonFavCloned.addEventListener('click', () => {
                    let imgFavCloned = buttonFavCloned.getElementsByTagName('img')
                    if (favoritesGif.map((x) => x.id).includes(response.data[i].id)) {
                        favoritesGif = favoritesGif.filter(function (x) {return x.id != response.data[i].id})
                        imgFavCloned[0].setAttribute('src', './assets/icon-fav.svg')
                        imgFavCloned[1].setAttribute('src', './assets/icon-fav-hover.svg')
                    } else {
                        favoritesGif.push(response.data[i])
                        imgFavCloned[0].setAttribute('src', './assets/icon-fav-activev2.svg')
                        imgFavCloned[1].setAttribute('src', './assets/icon-fav-activev2.svg')
                    }
                    localStorage.setItem('favorites', JSON.stringify(favoritesGif))
                    })
                zoomGif.appendChild(clone)
                zoomGif.appendChild(clone2)
                zoomGif.style.display = "flex"
                })
            // ------------------------------ CERRAR EL ZOOM DEL GIF -----------------------------------
            imgZoomGifClose.addEventListener('click', () => {
                while (zoomGif.childNodes.length > 2) {
                    zoomGif.removeChild(zoomGif.lastChild);
                }
                checkFavorites(response.data[i], imgFav, imgFav2)
                zoomGif.style.display = "none"
            })
            }
    }



    // imgZoomGifClose.addEventListener('click', () => {
    //         while (zoomGif.childNodes.length > 2) {
    //             zoomGif.removeChild(zoomGif.lastChild);
    //         }
    //         checkFavorites()
    //         zoomGif.style.display = "none"
    // })  

//------------------------------MAS RESULTADOS------------------------------------------------

    moreResults.addEventListener('click', () => {
        startingPosition = startingPosition + 12
        searchGifos(searchBar)
    })

//------------------------------TRENDING------------------------------------------------
    let scrollSon = document.getElementById('scroll-son')

    async function getTrending () {
        let response = await fetch(`${urlPath}/trending?api_key=${apiKey}&limit=3&rating=g`)
        response = await response.json()
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
    


//------------------------------CHEQUEO DE FAVORITOS------------------------------------------------
    function checkFavorites (gif, imgFav, imgFav2) {
        for (let i = 0; i < favoritesGif.length; i++) {
            if (gif.id == favoritesGif[i].id) {
                imgFav.setAttribute('src', './assets/icon-fav-activev2.svg')
                imgFav2.setAttribute('src', './assets/icon-fav-activev2.svg')
                return
            } else {
                imgFav.setAttribute('src', './assets/icon-fav.svg')
                imgFav2.setAttribute('src', './assets/icon-fav-hover.svg')
            }
        }
    }


}