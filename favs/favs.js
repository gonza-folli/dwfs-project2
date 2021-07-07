window.onload = () => {

    let night = document.getElementById('modo-nocturno')
    let body = document.getElementsByTagName('body')
    let imgLogoDesktop = document.getElementById('logodesktop')
    let imgLogoMobile = document.getElementById('logomobile')
    let imgBurger = document.getElementById('burger')
    let imgMoreResultsIcon = document.getElementById('moreResultsIcon')
    let buttonLeft = document.getElementById('buttonLeft')
    let buttonRight = document.getElementById('buttonRight')
    let imgZoomGifClose = document.getElementById('zoomGifClose')
    let flag = localStorage.getItem("Nocturne Mode") ? JSON.parse(localStorage.getItem("Nocturne Mode")) : true
    let flagBurger = 0

//-------------------------------------------MODO NOCTURNO------------------------------------------------
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
        imgLogoDesktop.setAttribute('src', '../assets/Logo-modo-noc.svg')
        imgLogoMobile.setAttribute('src', '../assets/logo-mobile-modo-noct.svg')
        imgBurger.setAttribute('src', '../assets/close-modo-noct.svg')
        imgMoreResultsIcon.setAttribute('src', '../assets/CTA-ver+-modo-noc.svg')
        buttonLeft.setAttribute('src', '../assets/button-slider-left-md-noct.svg')
        buttonRight.setAttribute('src', '../assets/button-slider-right-md-noct.svg')
        } else {
            imgLogoDesktop.setAttribute('src', '../assets/logo-desktop.svg')
            imgLogoMobile.setAttribute('src', '../assets/logo-mobile.svg')
            imgBurger.setAttribute('src', '../assets/close.svg')
            imgMoreResultsIcon.setAttribute('src', '../assets/CTA-ver-mas.svg')
            buttonLeft.setAttribute('src', '../assets/button-slider-left.svg')
            buttonRight.setAttribute('src', '../assets/Button-Slider-right.svg')
            imgZoomGifClose.setAttribute('src', '../assets/close.svg')
        }
    }
            // BOTON MENU HAMBURGUESA
    imgBurger.addEventListener('click', () => {
        if (flagBurger == 0 && flag == true){
            imgBurger.setAttribute('src', '../assets/close.svg')
            return flagBurger = 1}
            else if (flagBurger == 1 && flag == true) {
                imgBurger.setAttribute('src', '../assets/burger.svg')
                return flagBurger = 0}
                else if (flagBurger == 1 && flag == false) {
                    imgBurger.setAttribute('src', '../assets/burger-modo-noct.svg')
                    return flagBurger = 0}
                    else if (flagBurger == 0 && flag == false) {
                        imgBurger.setAttribute('src', '../assets/close-modo-noct.svg')
                        return flagBurger = 1}
                }
    )

//-------------------------------------------GET FAVOURITES------------------------------------------------
    let favoritesGif = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
    let searchResults = document.getElementById('searchResults')
    let resultsIcon = document.getElementById('resultsIcon')
    let resultsText = document.getElementById('resultsText')
    let moreResults = document.getElementById('moreResults')

// ------------------ FUNCION PRINCIPAL DE RENDERIZAR LOS FAVORITOS Y SUS BOTONES------------------------
    function renderFavorites (response, container) {
        for (let i = 0; i < response.length; i++) {
            let newDiv = document.createElement('div')
            newDiv.classList.add('containerGif')
            container.appendChild(newDiv)
            let newItem = document.createElement('img')
            newItem.setAttribute('src', `${response[i].images['original'].url}`)
            newItem.setAttribute('class', `img`)
            newItem.setAttribute('id', `img${[i]}`)
            newDiv.appendChild(newItem)
            let newDivHover = document.createElement('div')
            newDivHover.classList.add('containerGifSelected')
            newDivHover.innerHTML = 
            `<div class="icons">
                <button class="icon Fav" id="Fav-stored-${response[i].id}" type="button"><img id="imgFav-${response[i].id}" class="imgButton" src="../assets/icon-fav.svg" alt="fav"><img id="imgFav2-${response[i].id}" class="imgButtonHover" src="../assets/icon-fav-hover.svg" alt="fav"></button>
                <button class="icon Des" id="Des-stored-${response[i].id}" type="button"><img class="imgButton" src="../assets/icon-download.svg" alt="des"><img class="imgButtonHover" src="../assets/icon-download-hover.svg" alt="des"></button>
                <button class="icon Zoom" id="Zoom-stored-${response[i].id}" type="button"><img class="imgButton" src="../assets/icon-max-normal.svg" alt="max"><img class="imgButtonHover" src="../assets/icon-max-hover.svg" alt="max"></button>
            </div>
            <div class="text">
                <span>${response[i].username}</span>
                <span>${response[i].title}</span>
            </div>`
            newDiv.appendChild(newDivHover)
    // ---------------------------- FUNCION FAVORITOS  ---------------------
            let buttonFav = document.getElementById(`Fav-stored-${response[i].id}`)
            let imgFav = document.getElementById(`imgFav-${response[i].id}`)
            let imgFav2 = document.getElementById(`imgFav2-${response[i].id}`)
            checkFavorites(response[i], imgFav, imgFav2)

            buttonFav.addEventListener('click', () => {
                if (favoritesGif.map((x) => x.id).includes(response[i].id))  {
                    favoritesGif = favoritesGif.filter(function (x) {return x.id != response[i].id})
                    imgFav.setAttribute('src', '../assets/icon-fav.svg')
                    imgFav2.setAttribute('src', '../assets/icon-fav-hover.svg')
                } else {
                    favoritesGif.push(response[i])
                    imgFav.setAttribute('src', '../assets/icon-fav-activev2.svg')
                    imgFav2.setAttribute('src', '../assets/icon-fav-activev2.svg')
                }
                localStorage.setItem('favorites', JSON.stringify(favoritesGif))
            })
            // ---------- FUNCION ZOOM EN MODO DESKTOP ---------------------
            let buttonZoom = document.getElementById(`Zoom-stored-${response[i].id}`)
            buttonZoom.addEventListener('click', () => {
                let clone = newItem.cloneNode(true)
                let clone2 = newDivHover.cloneNode(true)
                let buttonFavCloned = clone2.getElementsByClassName('icon Fav')[0]
                buttonFavCloned.addEventListener('click', () => {
                    let imgFavCloned = buttonFavCloned.getElementsByTagName('img')
                    if (favoritesGif.map((x) => x.id).includes(response[i].id)) {
                        favoritesGif = favoritesGif.filter(function (x) {return x.id != response[i].id})
                        imgFavCloned[0].setAttribute('src', '../assets/icon-fav.svg')
                        imgFavCloned[1].setAttribute('src', '../assets/icon-fav-hover.svg')
                    } else {
                        favoritesGif.push(response[i])
                        imgFavCloned[0].setAttribute('src', '../assets/icon-fav-activev2.svg')
                        imgFavCloned[1].setAttribute('src', '../assets/icon-fav-activev2.svg')
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
                checkFavorites(response[i], imgFav, imgFav2)
                zoomGif.style.display = "none"
            })
        }
    }

    if (favoritesGif.length > 0) {
        renderFavorites(favoritesGif, searchResults)
        resultsIcon.style.display = "none"
        resultsText.style.display = "none"
    }
    
    if (favoritesGif.length > 12) {
        moreResults.style.display = "block"
    }

//------------------------------MAS RESULTADOS------------------------------------------------
    let containerGif = document.querySelectorAll('.containerGif')
    let indexFinal = 12

    console.log(containerGif)

    renderMoreResults()

    function renderMoreResults() {
        if (indexFinal > containerGif.length) {
        indexFinal = containerGif.length;
        }
        for (let i = 0; i < indexFinal; i++) {
            containerGif[i].style.display= "block"
        }
    }

    moreResults.addEventListener('click', () => {
        indexFinal = indexFinal + 12
        renderMoreResults()
    })


    //------------------------------FETCH TRENDING------------------------------------------------
    
    let urlPath = "https://api.giphy.com/v1/gifs"
    let apiKey = "1MDqvbtJKgdp21ND6twL1o2xpVnN9hLQ"
    let apiKey2 = "DjElvlwE1GAAFq1RVpDkjCpWZfhT1c1a"

    let scrollSon = document.getElementById('scroll-son')

    async function getTrending () {
        let response = await fetch(`${urlPath}/trending?api_key=${apiKey2}&limit=3&rating=g`)
        response = await response.json()
        return response
    }
    getTrending().then(
        (response) => {
            renderGif(response, scrollSon)
        }
    )
    //------------------------------RENDERIZAR TRENDING------------------------------------------------
    
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
                <button class="icon Fav" id="Fav-${response.data[i].id}" type="button"><img id="imgFavTrend-${response.data[i].id}" class="imgButton" src="../assets/icon-fav.svg" alt="fav"><img id="imgFavTrend2-${response.data[i].id}" class="imgButtonHover" src="../assets/icon-fav-hover.svg" alt="fav"></button>
                <button class="icon Des" id="Des-${response.data[i].id}" type="button"><img class="imgButton" src="../assets/icon-download.svg" alt="des"><img class="imgButtonHover" src="../assets/icon-download-hover.svg" alt="des"></button>
                <button class="icon Zoom" id="Zoom-${response.data[i].id}" type="button"><img class="imgButton" src="../assets/icon-max-normal.svg" alt="max"><img class="imgButtonHover" src="../assets/icon-max-hover.svg" alt="max"></button>
            </div>
            <div class="text">
                <span>${response.data[i].username}</span>
                <span>${response.data[i].title}</span>
            </div>`
            newDiv.appendChild(newDivHover)


            let buttonFav = document.getElementById(`Fav-${response.data[i].id}`)
            let imgFav = document.getElementById(`imgFavTrend-${response.data[i].id}`)
            let imgFav2 = document.getElementById(`imgFavTrend2-${response.data[i].id}`)
            checkFavorites(response.data[i], imgFav, imgFav2)
            // ---------------------------- FUNCION FAVORITOS  ---------------------
            buttonFav.addEventListener('click', () => {
                console.log(response.data[i].title)
                if (favoritesGif.map((x) => x.id).includes(response.data[i].id)) {
                    favoritesGif = favoritesGif.filter(function (x) {return x.id != response.data[i].id})
                    imgFav.setAttribute('src', '../assets/icon-fav.svg')
                    imgFav2.setAttribute('src', '../assets/icon-fav-hover.svg')
                } else {
                    favoritesGif.push(response.data[i])
                    imgFav.setAttribute('src', '../assets/icon-fav-activev2.svg')
                    imgFav2.setAttribute('src', '../assets/icon-fav-activev2.svg')
                }
                localStorage.setItem('favorites', JSON.stringify(favoritesGif))
                })
            // ---------- FUNCION ZOOM EN MODO DESKTOP ---------------------
            let buttonZoomTrending = document.getElementById(`Zoom-${response.data[i].id}`)
            buttonZoomTrending.addEventListener('click', () => {
                let clone = newItem.cloneNode(true)
                let clone2 = newDivHover.cloneNode(true)
                let buttonFavCloned = clone2.getElementsByClassName('icon Fav')[0]
                buttonFavCloned.addEventListener('click', () => {
                    let imgFavCloned = buttonFavCloned.getElementsByTagName('img')
                    if (favoritesGif.map((x) => x.id).includes(response.data[i].id)) {
                        favoritesGif = favoritesGif.filter(function (x) {return x.id != response.data[i].id})
                        imgFavCloned[0].setAttribute('src', '../assets/icon-fav.svg')
                        imgFavCloned[1].setAttribute('src', '../assets/icon-fav-hover.svg')
                    } else {
                        favoritesGif.push(response.data[i])
                        imgFavCloned[0].setAttribute('src', '../assets/icon-fav-activev2.svg')
                        imgFavCloned[1].setAttribute('src', '../assets/icon-fav-activev2.svg')
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
    

//------------------------------CHEQUEO DE FAVORITOS------------------------------------------------
    function checkFavorites (gif, imgFav, imgFav2) {
        for (let i = 0; i < favoritesGif.length; i++) {
            if (gif.id == favoritesGif[i].id) {
                imgFav.setAttribute('src', '../assets/icon-fav-activev2.svg')
                imgFav2.setAttribute('src', '../assets/icon-fav-activev2.svg')
                return
            } else {
                imgFav.setAttribute('src', '../assets/icon-fav.svg')
                imgFav2.setAttribute('src', '../assets/icon-fav-hover.svg')
            }
        }
    }


}