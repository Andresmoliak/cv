//for audio
const audioImg = document.querySelector('.audio__button img')
const audioButton = document.querySelector('.audio__button')
const audio = new Audio()
const src = './audio/MACAN - Кино(минус) (mp3-2020.com).mp3'
//for burger
const body = document.querySelector('body')
const nav = document.querySelector('.nav')
const burgerBut = document.querySelector('.header__burger') 
//for animation on scroll
const animItems = Array.from(document.querySelectorAll('.anim-item'))

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
  body.classList.toggle('locked')
  burgerBut.classList.toggle('burger__active')
  nav.classList.toggle('nav__active')
})

//animation on scroll
if (animItems.length > 0){
  window.addEventListener('scroll', animOnScroll)
  function animOnScroll(){
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight
      const animItemOffset = offset(animItem).top
      const animStart = 4

      let animItemPoint = window.innerHeight - animItemHeight / animStart
      if(animItemHeight > window.innerHeight){
        animItemPoint = window.innerHeight - window.innerHeight / animStart
      }
      if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
        animItem.classList.add('active')
      } else {
        animItem.classList.remove('active')
      }
    }
  }
  function offset (el){
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, 
        scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
  }
  animOnScroll()
}
