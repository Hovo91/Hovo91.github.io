let img = document.getElementById('img');
let slider = document.getElementById('slider');
let images = [2, 3, 4, 5, 6, 7, 1];
let i = images.length;
let timer = 0;

let nextImage = () => {
  if (i < images.length) {
    i++;
  } else {
    i = 1;
  }
  img.innerHTML = "<img src="+images[i - 1]+".jpg>";
}

let prewImage = () => {
  if (i < images.length + 1 && i > 1) {
    i--;
  } else {
    i = images.length;
  }
  img.innerHTML = "<img src="+images[i - 1]+".jpg>";
}

let playPause = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  } else {
    timer = setInterval(nextImage, 1500);
  }
}
