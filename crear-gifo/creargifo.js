window.onload = () => {

    let night = document.getElementById('modo-nocturno')
    let body = document.getElementsByTagName('body')
    let imgLogoDesktop = document.getElementById('logodesktop')
    let imgLogoMobile = document.getElementById('logomobile')
    let imgBurger = document.getElementById('burger')
    let flag = localStorage.getItem("Nocturne Mode") ? JSON.parse(localStorage.getItem("Nocturne Mode")) : true
    let flagBurger = 0

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
        imgLogoDesktop.setAttribute('src', '../assets/Logo-modo-noc.svg')
        imgLogoMobile.setAttribute('src', '../assets/logo-mobile-modo-noct.svg')
        imgBurger.setAttribute('src', '../assets/close-modo-noct.svg')
        } else {
            imgLogoDesktop.setAttribute('src', '../assets/logo-desktop.svg')
            imgLogoMobile.setAttribute('src', '../assets/logo-mobile.svg')
            imgBurger.setAttribute('src', '../assets/close.svg')
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

/* ------------------ ACCEDER A LA CAMARA ------------------------ */
let video = document.getElementById('video')
let startButton = document.getElementById('startButton')
let recordButton = document.getElementById('recordButton')
let finishButton = document.getElementById('finishButton')
let uploadButton = document.getElementById('uploadButton')
let screenText = document.getElementById('screenText')
let screenTextP = document.getElementById('screenTextP')
let screenText2 = document.getElementById('screenText2')
let screenTextP2 = document.getElementById('screenTextP2')
let screenButton1 = document.getElementById('screenButton1')
let screenButton2 = document.getElementById('screenButton2')
let screenButton3 = document.getElementById('screenButton3')


console.log(navigator.mediaDevices)

// --------------------------------COMENZAR PROCESO--------------------------------------------
startButton.addEventListener('click', () => {
    screenText.style.display = "none"
    screenTextP.style.display = "none"
    screenText2.style.display = "block"
    screenTextP2.style.display = "block"
    screenButton1.style.color = "white"
    screenButton1.style.backgroundColor = "#572EE5"
    startButton.style.display = "none"
    accessToCamera()
})

// --------------------------------ACCEDIENDO A LA CAMARA--------------------------------------------
let stream = 0
let recorder = 0
let tracks = 0

function accessToCamera () {
    stream = navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
    }).then(function(stream) {
        video.srcObject = stream
        video.play()
        screenText2.style.display = "none"
        screenTextP2.style.display = "none"
        video.style.display = "block"
        screenButton1.style.color = "#572EE5"
        screenButton1.style.backgroundColor = "white"
        screenButton2.style.color = "white"
        screenButton2.style.backgroundColor = "#572EE5"
        recordButton.style.display = "block"
        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
        })
        tracks = stream.getTracks()
    })
}

// --------------------------------GRABAR GIF--------------------------------------------
let tiempo = 0
let timerDiv = document.getElementById('timerDiv')
let repeat = document.getElementById('repeat')

recordButton.addEventListener('click', () => {
    console.log(recorder)
    recorder.startRecording()

    tiempo = setInterval(timer,1000) //para iniciar el tiempo
    video.currentTime = 0
    function timer () {
        let s = parseInt(video.currentTime % 60);
        let m = parseInt((video.currentTime / 60) % 60);
        timerDiv.innerHTML = '00:'+ m + ':' + s ;
    }
    recordButton.style.display = "none"
    finishButton.style.display = "block"
})

// --------------------------------FINALIZAR GIF--------------------------------------------
let recordedGif = 0

finishButton.addEventListener('click', () => {
    recorder.stopRecording(function() {
        recordedGif = recorder.getBlob();   //para almacenar el gif en la variable recordedGif
        console.log(recordedGif)
    });
    video.pause()       //para apagar la cámara
    tracks.forEach(function(track) {
        track.stop();
      })
    clearInterval(tiempo);  //para parar la ejecucion del evento automatico
    timerDiv.style.display= "none"
    repeat.style.display= "block"
    finishButton.style.display = "none"
    uploadButton.style.display = "block"
})

// --------------------------------REPETIR CAPTURA GIF----------------------------------

repeat.addEventListener('click', () => {
    accessToCamera ()
    repeat.style.display= "none"
    uploadButton.style.display = "none"
})


// --------------------------------SUBIR GIF--------------------------------------------
let form = new FormData()
let urlPath = "https://upload.giphy.com/v1/gifs"
let apiKey = "DjElvlwE1GAAFq1RVpDkjCpWZfhT1c1a"
let uploadedGif = localStorage.getItem('Mis_Gifs') ? JSON.parse(localStorage.getItem('Mis_Gifs')) : []

console.log(uploadedGif)

uploadButton.addEventListener('click', () => {
    form.append('file', recordedGif, 'myGif.gif')
    console.log(form.get('file'))
    
    uploadGif(form).then(response => {
        console.log(response.data.id)
        uploadedGif.push(response.data.id)
        localStorage.setItem('Mis_Gifs',  JSON.stringify(uploadedGif))
    }).catch(error => console.error)

})

async function uploadGif (form) {
    let response = await fetch(`${urlPath}?api_key=${apiKey}`, {
        method: 'POST',
        body: form
    })
    return response.json()
}



}