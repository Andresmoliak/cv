//for audio
const audioImg = document.querySelector('.audio__button img')
const audioButton = document.querySelector('.audio__button')
const audio = new Audio()
const src = './audio/MACAN - Кино(минус) (mp3-2020.com).mp3'
//for burger
const html = document.querySelector('html')
const nav = document.querySelector('.nav')
const burgerBut = document.querySelector('.header__burger') 
//for scroll
const animItems = Array.from(document.querySelectorAll('.anim-item'))
//for modal
const modalBlack = document.querySelector('.skills__modal')
const modalWindow = document.querySelector('.skills__modal__content')
const logos = Array.from(document.querySelectorAll('.skills__images__image'))
const header = document.querySelector('.header')
const buttonClose = document.querySelector('.close')

window.onload = function (){
    localStorage.clear()
}
let audioNumber = 0
function audioPlay(){
  audio.src = src
  audio.play()
  audio.addEventListener('timeupdate', function (){
    localStorage.setItem('audioTime', audio.currentTime)
  })
  audio.currentTime = localStorage.getItem('audioTime')
 }
function audioPause(){
  audio.src = src
  audio.pause()
  let storedTime = localStorage.getItem('audioTime')
  if(storedTime){audio.currentTime = storedTime}
}
let isPlay = false
const imgPlayer = document.querySelector('.audio')

function changeCondition(){
if(isPlay === false){isPlay = true, audioPlay(), audioImg.classList.add('audio-active')}
else if(isPlay === true){isPlay = false, audioPause(), audioImg.classList.remove('audio-active')}
}

audioButton.addEventListener('click', changeCondition)
audio.addEventListener('ended', function (){
    delete localStorage.audioTime
    audioPlay()
})

//burger
burgerBut.addEventListener('click', ()=>{
  html.classList.toggle('locked')
  burgerBut.classList.toggle('burger__active')
  nav.classList.toggle('nav__active')
})
//scroll
if (animItems.length > 0){
  window.addEventListener('scroll', animOnScroll)
  function animOnScroll(){  
  for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animitemHeight = animItem.offsetHeight
      const animItemOffset = offset(animItem).top
      const animStart = 4
  
   let animItemPoint = window.innerHeight - animitemHeight / animStart
     if(animitemHeight > window.innerHeight){
       animItemPoint = window.innerHeight - window.innerHeight / animStart
      }
  
      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animitemHeight)){
          animItem.classList.add('active')
      } else {
        animItem.classList.remove('active')
      }
    }
 }
  function offset (el){
   const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop =  window.pageYOffset || document.documentElement.scrollTop
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
  }
  animOnScroll()
}


//modal window
//take json
function add (){
  logos.forEach((el) =>{
    el.addEventListener('click', () => {
      const index = logos.indexOf(el)
      async function addJson () {
      const src = 'skills.json'
      const ready = await fetch(src)
      const skills = await ready.json()
      console.log(skills)
      document.querySelector('.modal__header__title').innerHTML = skills[index].name
      document.querySelector('.modal__content__text').innerHTML = skills[index].text
      document.querySelector('.modal__header__logo').innerHTML = `<img src="${skills[index].logo}" alt="logo">`
      }
      addJson()
  modalBlack.classList.add('active')
  modalWindow.classList.add('active')
  html.classList.add('locked')
  header.classList.add('modal') 
    })
  })
}
add()

function close (){
  modalBlack.classList.remove('active')
  modalWindow.classList.remove('active')
  html.classList.remove('locked')
  header.classList.remove('modal')
}

modalBlack.addEventListener('click', close)
buttonClose.addEventListener('click', close)

//time

window.onload = function time (){
  setInterval(() => {
    const date = new Date()
    let hours
    let minutes
    let seconds 
    if(date.getHours() < 10){hours = `0${date.getHours()}`} else {hours = date.getHours()}
    if(date.getMinutes() < 10){minutes = `0${date.getMinutes()}`} else {minutes = date.getMinutes()}
    if(date.getSeconds() < 10){seconds = `0${date.getSeconds()}`} else {seconds = date.getSeconds()}
    document.querySelector('.skills__sign__time').innerHTML = `${hours}:${minutes}:${seconds}`
  }, 1000)
}

          