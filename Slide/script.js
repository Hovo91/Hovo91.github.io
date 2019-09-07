var slider = document.getElementById('box');
var images = [1, 2, 3, 4, 5, 6, 7];
var i = images.length;
function nextImage() {
  if (i < images.length) {
    i++;
  } else {
    i = 1;
  }
  slider.innerHTML = "<img src="+images[i - 1]+".jpg>";
}
function prewImage() {
  if (i < images.length + 1 && i > 1) {
    i--;
  } else {
    i = images.length;
  }
  slider.innerHTML = "<img src="+images[i - 1]+".jpg>";
}
