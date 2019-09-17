const img = document.querySelector('#img');
const slider = document.querySelector('#slider');
const next = document.querySelector('#next');
const prew = document.querySelector('#prew');
const play = document.querySelector('#play-pause');
const images = [8, 2, 3, 4, 5, 6, 7, 1];
let i = images.length;
let timer = 0;

next.addEventListener('click', nextImage);
function nextImage() {
  if (i < images.length) {
    i++;
  } else {
    i = 1;
  }
  img.innerHTML = "<img src="+images[i - 1]+".jpg>";
}

prew.addEventListener('click', prewImage);
function prewImage() {
  if (i < images.length + 1 && i > 1) {
    i--;
  } else {
    i = images.length;
  }
  img.innerHTML = "<img src="+images[i - 1]+".jpg>";
}

play.addEventListener('click', playPause);
function playPause() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  } else {
    timer = setInterval(nextImage, 1500);
  }
}
