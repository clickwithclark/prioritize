import { retrieveFromLocalStorage } from './localStorage.js';
import { processTodo } from './processTodo.js';
import { updateDOM } from './updateDOM.js';

export function editTodo(e) {

  const listItemToEdit = e.target.parent;
  const { id } = listItemToEdit.dataset;
  const storedTodos = retrieveFromLocalStorage();
  todoTo;
  let messageNode = listItemToEdit.querySelector(".main-message");
  let currentMessage = messageNode.innerText;
  listItemToEdit.contentEditable=true;
  messageNode.addEventListener((event) => {
    //if enter is pressed
    if (event.which === 13) {
      listItemToEdit.contentEditable=false;

    }
  })
  
}

export function updateTodo(e) {

  const listItemToEdit = e.target.parent;
  const { id } = listItemToEdit.dataset;
  const storedTodos = retrieveFromLocalStorage();
  todoTo;
  let currentMessage = listItemToEdit.querySelector(".main-message").innerText;
  processTodo(listItemToEdit.qu)
  updateDOM();
}
