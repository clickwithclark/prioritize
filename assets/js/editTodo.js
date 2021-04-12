import { saveUpdateConfig } from './localStorage.js';
import { updateDOM } from './updateDOM.js';

export function editTodo(e) {
  const input = document.querySelector('#todoInput');
  const listItemToEdit = e.target.closest('li');
  const { id } = listItemToEdit.dataset;
  const todoOffset = listItemToEdit.offsetTop;
  const editingAreaLocation = document.querySelector('h1').offsetTop;
  const messageNode = listItemToEdit.querySelector('.main-message');
  const originalMessage = messageNode.innerText;

  // prevent editing if todo is completed (crossed off)
  if (messageNode.classList.contains('completed')) {
    return updateDOM();
  }

  const editValue = messageNode.innerText.replace('[', '(').replace(']', ')');
  input.value = editValue;
  input.classList.add('editing-in-progress');
  input.classList.add('pop-out-fade-out');
  input.placeholder = `Updating: ${originalMessage.slice(0, 16)}...📑`;
  window.scrollTo({ top: editingAreaLocation, behavior: 'smooth' });
  input.focus();

  // capture original ID for todo
  const updatedTodo = {};
  updatedTodo.id = +id;

  /**
   * @config
   * @property {number}  todoOffset - The offset top position of the todo.
   * @property {object}  updatedTodo - a partial of the todo being updated.
   * @property {number}  updatedTodo.id - The id of the todo being updated.
   */
  const config = { todoOffset, updatedTodo };
  saveUpdateConfig(config);
}
