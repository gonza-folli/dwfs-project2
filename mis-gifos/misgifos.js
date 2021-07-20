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

    //------------------------------MODO NOCTURNO--------------------------------------------------------------------------------
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
        imgZoomGifClose.setAttribute('src', '../assets/close-modo-noct.svg')
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
    //------------------------------GET MISGIFOS------------------------------------------------------------------------------
    let favoritesGif = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
    let misGifos = localStorage.getItem('Mis_Gifs') ? JSON.parse(localStorage.getItem('Mis_Gifs')) : []
    let misGifosString = localStorage.getItem('Mis_Gifs')
    let searchResults = document.getElementById('searchResults')
    let resultsIcon = document.getElementById('resultsIcon')
    let resultsText = document.getElementById('resultsText')
    let urlPath = "https://api.giphy.com/v1/gifs"
    let apiKey = "1MDqvbtJKgdp21ND6twL1o2xpVnN9hLQ"
    let apiKey2 = "DjElvlwE1GAAFq1RVpDkjCpWZfhT1c1a"
    let containerGif = 0
    
    console.log(misGifos)

    // if (misGifos !== []) {
    //     resultsIcon.style.display= "none"
    //     resultsText.style.display= "none"
    //     } 
    //     else {
    //         searchResults.style.display= "none"
    //     }

    if (misGifos.length > 0) {
        resultsIcon.style.display= "none"
        resultsText.style.display= "none"
        } 
        else {
            searchResults.style.display= "none"
        }
// ------------  DANDOLE FORMATO AL STRING DEL LOCALSTORAGE PARA INCLUIR EN EL FETCH --------------------------------
    stringOutputId()

    function stringOutputId () {
        if (misGifosString !== null) {
            misGifosString = misGifosString.replace(/"/g, '')
            misGifosString = misGifosString.replace("[", '')
            misGifosString = misGifosString.replace("]", '')
            return misGifosString
            }
    }

// -----------------------------------------  FETCH MIS GIFOS ----------------------------------------------------
    async function getMisGifos () {
        let response = await fetch(`${urlPath}?api_key=${apiKey}&ids=${misGifosString}`)
        response = await response.json()
        console.log(response)
        return response
    }

    //----------------------------RESOLUCION DE LA PROMESA Y MOSTRAR MAS RESULTADOS----------------------------------------------------------
    if (misGifos.length > 0) {
        getMisGifos().then(
        (response) => {
            renderGif(response, searchResults)
            containerGif = document.querySelectorAll('.containerGif')
            if (containerGif.length > 12) {
                moreResults.style.display = "block"
            }
            renderMoreResults()
        })
    }

    let indexFinal = 12

    function renderMoreResults() {
        if (indexFinal > containerGif.length) {
        indexFinal = containerGif.length;
        moreResults.style.display = "none"
        }
        for (let i = 0; i < indexFinal; i++) {
            containerGif[i].style.display= "block"
        }
    }

    moreResults.addEventListener('click', () => {
        indexFinal = indexFinal + 12
        renderMoreResults()
    })

    //------------------------------FETCH TRENDING------------------------------------------------------------------------------------------

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
        }
    )
// ------------------ FUNCION PRINCIPAL DE RENDERIZAR LOS GIF Y SUS BOTONES--------------------------------------------------
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
                <button class="icon Fav" id="Fav-${response.data[i].id}" type="button"><img id="imgFav-${response.data[i].id}" class="imgButton" src="../assets/icon-fav.svg" alt="fav"><img id="imgFav2-${response.data[i].id}" class="imgButtonHover" src="../assets/icon-fav-hover.svg" alt="fav"></button>
                <button class="icon Des" id="Des-${response.data[i].id}" type="button"><img class="imgButton" src="../assets/icon-download.svg" alt="des"><img class="imgButtonHover" src="../assets/icon-download-hover.svg" alt="des"></button>
                <button class="icon Zoom" id="Zoom-${response.data[i].id}" type="button"><img class="imgButton" src="../assets/icon-max-normal.svg" alt="max"><img class="imgButtonHover" src="../assets/icon-max-hover.svg" alt="max"></button>
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
                    imgFav.setAttribute('src', '../assets/icon-fav.svg')
                    imgFav2.setAttribute('src', '../assets/icon-fav-hover.svg')
                } else {
                    favoritesGif.push(response.data[i])
                    imgFav.setAttribute('src', '../assets/icon-fav-activev2.svg')
                    imgFav2.setAttribute('src', '../assets/icon-fav-activev2.svg')
                }
                localStorage.setItem('favorites', JSON.stringify(favoritesGif))
            })
            // ------------------------------ FUNCION ZOOM EN MODO MOBILE ---------------------
            newItem.addEventListener('click', () => {
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
                let buttonDesCloned = clone2.getElementsByClassName('icon Des')[0]
                buttonDesCloned.addEventListener('click', () => {
                    let url = `${response.data[i].images['original'].url}`
                    let filename = `${response.data[i].id}`
                    downloadGif(url, filename)
                })
                zoomGif.appendChild(clone)
                zoomGif.appendChild(clone2)
                zoomGif.style.display = "flex"
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
                let buttonDesCloned = clone2.getElementsByClassName('icon Des')[0]
                buttonDesCloned.addEventListener('click', () => {
                    let url = `${response.data[i].images['original'].url}`
                    let filename = `${response.data[i].id}`
                    downloadGif(url, filename)
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
            // -------------------------------------- BOTON PARA DESCARGAR ---------------------
            let buttonDes = document.getElementById(`Des-${response.data[i].id}`)
            buttonDes.addEventListener('click', () => {
                let url = `${response.data[i].images['original'].url}`
                let filename = `${response.data[i].id}`
                downloadGif(url, filename)
            })
        }
    }

    // -------------------------------------- FUNCION DESCARGAR --------------------
    function downloadGif(url, filename) {
        fetch(url).then(
            (response) => {
                return response.blob().then(
                    (response) => {
                        let newElement = document.createElement('a')
                        newElement.href = URL.createObjectURL(response)
                        newElement.setAttribute('download', filename)
                        newElement.click()
                    }
                )
            }
        )
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