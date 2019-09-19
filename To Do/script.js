const input = document.getElementById('text');
const add = document.getElementById('add-btn');
const list = document.getElementById('to-do-list');
let data = new Date();
let options = {weekday: 'short', month: 'short', day: 'numeric'};
function addToDo(toDo){
  let i = 0;
  const div = document.createElement('div');
  const span = document.createElement('span');
  const button = document.createElement('button');
  div.className = 'item';
  button.className = 'delete';
  button.innerText = 'Delete';
  span.className = 'item-text';
  span.innerText = toDo + "   " + data.toLocaleDateString('en-US', options);
  div.appendChild(span);
  div.appendChild(button);
  list.appendChild(div);
  button.onclick = function deleteItem(){
    div.remove();
  }
  span.onclick = function(){
    if(i % 2 === 0) {    
      span.style = "text-decoration: line-through";
      i++;
    } else {
      span.style = "text-decoration: none";
      i++;
    }
  }
}

document.addEventListener('keyup', function(event){
  if(event.keyCode === 13) {
    const toDo = input.value;
    if(toDo != 0) {
      addToDo(toDo);
    }
    input.value = '';
  }
});

add.addEventListener('click', function(event){
    const toDo = input.value;
    if(toDo != 0) {
      addToDo(toDo);
    }
    input.value = '';
});