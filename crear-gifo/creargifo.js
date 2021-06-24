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

startButton.addEventListener('click', () => {
    screenText.style.display = "none"
    screenTextP.style.display = "none"
    screenText2.style.display = "block"
    screenTextP2.style.display = "block"
    screenButton1.setAttribute('src', '../assets/paso-a-paso-hover.svg')
    accessToCamera()
})

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
        screenButton1.setAttribute('src', '../assets/paso-a-paso.svg')
        screenButton2.setAttribute('src', '../assets/paso-a-paso-hover.svg')
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
})

let recordedGif = 0


finishButton.addEventListener('click', () => {
    recorder.stopRecording(function() {
        recordedGif = recorder.getBlob();
        console.log(recordedGif)
    });
    video.pause()
    tracks.forEach(function(track) {
        track.stop();
      })
    clearInterval(tiempo); //para parar la ejecucion del evento automatico
    timerDiv.style.display= "none"
    repeat.style.display= "block"
})

let form = new FormData()

uploadButton.addEventListener('click', () => {
    form.append('file', recordedGif, 'myGif.gif')
    console.log(form.get('file'))
    XMLHttpRequest.send(form)
})




}