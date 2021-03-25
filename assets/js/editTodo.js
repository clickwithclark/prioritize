import { addGlobalEventListener } from './addGlobalEventListener.js';
import { updateTodo } from './updateTodo.js';
import { updateTodoFromSpan } from './updateTodoFromSpan.js';

function endUpdate(messageNode) {
  messageNode.contentEditable = false;
  messageNode.style.backgroundColor = 'inherit';
  messageNode.style.color = 'inherit';
}
export function editTodo(e) {
  const listItemToEdit = e.target.closest('li');
  const messageNode = listItemToEdit.querySelector('.main-message');
  messageNode.classList.add('editing-in-progress');

  const originalMessage = messageNode.innerText;
  messageNode.contentEditable = true;

  messageNode.focus();
  messageNode.style.backgroundColor = 'white';
  messageNode.style.color = 'black';
  let editValue = messageNode.innerText.replace('[', '(');
  editValue = editValue.replace(']', ')');
  messageNode.innerText = editValue;

  // placing caret midway of content
  const selection = window.getSelection();
  const halfwayPoint = Math.floor(messageNode.innerText.length / 2);
  const range = document.createRange();
  range.setStart(messageNode.childNodes[0], halfwayPoint);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);

  // handle update if button is pressed while an update is ongoing
  // assume user is saving
  // if (originalMessage.trim() === messageNode.innerText.trim()) {
  //   endUpdate(messageNode);
  //   return;
  // }

  messageNode.addEventListener('keydown', (event) => {
    // if enter is pressed
    if (event.key === 'Enter') {
      event.preventDefault();
      endUpdate(messageNode);
      updateTodo(event);
    }
  });
}
