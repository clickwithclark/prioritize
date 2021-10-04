import { createOneTodo } from './createOneTodo.js';
import { feedbackMessage } from './feedbackMessage.js';

export function createManyTodos(note) {
  const list = note.split(',');

  // prevent app freezing by only accepting a max of 30 tasks for multi entry at a time
  try {
    if (list.length > 30) {
      throw new Error(`Woah ! Woah !. . . that's too many at one time!, I'll only accept <span class="good">30</span> ,
      you tried to enter <span class="bad">${list.length}</span> Tasks !
      `);
    }

    list.forEach((listItem) => {
      createOneTodo(listItem);
    });
  } catch (error) {
    console.error(error.message);
    feedbackMessage(error.message, 10);
  }
}
