import { addTodo } from './addTodo.js';
import { endUpdate } from './endUpdate.js';
import { feedbackMessage } from './feedbackMessage.js';
import { clearUpdateConfig, getState, updateTodo } from './localStorage.js';
import { processTodo } from './processTodo.js';
import { updateDOM } from './updateDOM.js';

export function processInput(event) {
  // when enter is pressed
  if (event.key === 'Enter') {
    if (event.target.classList.contains('editing-in-progress')) {
      const config = getState()?.updateConfig;
      if (config) {
        // user is trying to save updated todo
        const input = document.querySelector('#todoInput');
        try {
          const newTask = input.value.trim();
          // complain if invalid values
          if (newTask === '') {
            throw new Error('Woops, update cannot be blank! . . . try deleting it instead');
          }
          const updatedTodo = processTodo(newTask);
          updatedTodo.id = config.updatedTodo.id;
          updateTodo(updatedTodo);

          // reset input to pre-updating defaults

          endUpdate(input);
          clearUpdateConfig();

          // scroll back to original todo position in list

          window.scrollTo({ top: config.todoOffset, behavior: 'smooth' });

          return updateDOM();
        } catch (error) {
          console.trace(error);
          feedbackMessage(error.message);
        }
      }
    }
    try {
      // complain if invalid values
      if (event.target.value.trim() === '') {
        throw new Error('Woops, you have to enter something first!');
      }
      // if this is first entry replace demo todos

      addTodo();
      event.target.value = '';
      endUpdate(event.target); // for times when editing event lead to adding a new todo
      updateDOM();
    } catch (error) {
      console.trace(error);
      feedbackMessage(error.message);
    }
  }
}
