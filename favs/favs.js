window.onload = () => {

    let night = document.getElementById('modo-nocturno')
    let body = document.getElementsByTagName('body')
    let imgLogoDesktop = document.getElementById('logodesktop')
    let imgLogoMobile = document.getElementById('logomobile')
    let imgBurger = document.getElementById('burger')
    let buttonLeft = document.getElementById('buttonLeft')
    let buttonRight = document.getElementById('buttonRight')
    let flag = true
    let flagBurger = 0

    //------------------------------MODO NOCTURNO------------------------------------------------
            // BOTON ACTIVAR MODO NOCTURNO
    night.addEventListener('click', () => {
        flag = !flag
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
        buttonLeft.setAttribute('src', '../assets/button-slider-left-md-noct.svg')
        buttonRight.setAttribute('src', '../assets/button-slider-right-md-noct.svg')
        } else {
            imgLogoDesktop.setAttribute('src', '../assets/logo-desktop.svg')
            imgLogoMobile.setAttribute('src', '../assets/logo-mobile.svg')
            imgBurger.setAttribute('src', '../assets/close.svg')
            buttonLeft.setAttribute('src', '../assets/button-slider-left.svg')
            buttonRight.setAttribute('src', '../assets/Button-Slider-right.svg')
        }
    }

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
    //------------------------------GET FAVOURITES------------------------------------------------
    let favoritesGif = JSON.parse(localStorage.getItem('favorites'))
    let searchResults = document.getElementById('searchResults')
    let resultsIcon = document.getElementById('resultsIcon')
    let resultsText = document.getElementById('resultsText')
    console.log(favoritesGif)

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
                <button class="icon" id="Fav-${response[i].id}" type="button"><img src="../assets/icon-fav.svg" alt="fav"></button>
                <button class="icon" id="Des-${response[i].id}" type="button"><img src="../assets/icon-download.svg" alt="des"></button>
                <button class="icon" id="Zoom-${response[i].id}" type="button"><img src="../assets/icon-max-normal.svg" alt="max"></button>
            </div>
            <div class="text">
                <span>User</span>
                <span>${response[i].title}</span>
            </div>`
            newDiv.appendChild(newDivHover)
            let buttonFav = document.getElementById(`Fav-${response[i].id}`)
            buttonFav.addEventListener('click', () => {
                favoritesGif.push(response[i])
                localStorage.setItem('favorites', JSON.stringify(favoritesGif))
            })
        }
    }
    if (favoritesGif !== null) {
        renderFavorites(favoritesGif, searchResults)
        resultsIcon.style.display = "none"
        resultsText.style.display = "none"
    }
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
    //------------------------------RENDERIZAR IMAGENES------------------------------------------------
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
                <button class="icon" id="Fav-${response.data[i].id}" type="button"><img src="../assets/icon-fav.svg" alt="fav"></button>
                <button class="icon" id="Des-${response.data[i].id}" type="button"><img src="../assets/icon-download.svg" alt="des"></button>
                <button class="icon" id="Zoom-${response.data[i].id}" type="button"><img src="../assets/icon-max-normal.svg" alt="max"></button>
            </div>
            <div class="text">
                <span>User</span>
                <span>${response.data[i].title}</span>
            </div>`
            newDiv.appendChild(newDivHover)
            let buttonFav = document.getElementById(`Fav-${response.data[i].id}`)
            buttonFav.addEventListener('click', () => {
                favoritesGif.push(response.data[i])
                localStorage.setItem('favorites', JSON.stringify(favoritesGif))
            })
        }
    }





}