const input = document.getElementById('text');
const add = document.getElementById('add-btn');
const list = document.getElementById('to-do-list');

input.onclick = function(){
  input.placeholder = '';
}
function addToDo(toDo){
  input.placeholder = 'Add to task :)';
  let j = 0;
  const div = document.createElement('div');
  const span = document.createElement('span');
  const button = document.createElement('button');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  div.className = 'item';
  button.className = 'delete';
  button.innerText = 'Delete';
  span.className = 'item-text';
  let data = new Date();
  let options = {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  span.innerText = toDo + "   " + data.toLocaleDateString('en-US', options);
  div.appendChild(span);
  div.appendChild(checkbox);
  div.appendChild(button);
  list.appendChild(div);
  button.onclick = function deleteItem(){
    div.remove();
  }
  checkbox.onclick = function(){
    if(j % 2 === 0) {    
      span.style = "text-decoration: line-through";
      j++;
    } else {
      span.style = "text-decoration: none";
      j++;
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