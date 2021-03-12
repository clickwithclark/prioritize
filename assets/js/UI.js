import {manageCreatedTodos} from './manageCreatedTodos.js'
import {demo} from './demo.js'
/* eslint-disable require-jsdoc */
// UI Class
/**
 * Manage User Interface
 * @function UI
 * @param  {Array}  demolist a list of todos to populate the UI
 * @return {undefined}
 */
export class UI {
  static showTodos(demolist = null) {
    // get todos from storage and populate UI if none found use demo todos
    const storedTodos = manageCreatedTodos.getListOfTodo();
    if (storedTodos.length !== 0) {
      demolist = storedTodos;
    }
    if (demolist) {
      const ul = document.querySelector('.app-container ul');
      demolist.forEach((todo) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-id', todo.id);
        listItem.setAttribute('draggable', true);
        listItem.innerHTML = todo.note;
        // preserve state of selected todo
        todo.isCompleted ? listItem.classList.add('completed') : listItem.classList.remove('completed');
        todo.isCompleted ? listItem.firstChild.classList.add('clickedLi') : listItem.firstChild.classList.remove('clickedLi');

        ul.append(listItem);
      });
      return;
    }
    if (demo.getDemoStorage().length > 1) {
      return this.showTodos(demo.getDemoStorage());
    }
    demo.runDemo(
      `Eg. Buy Tomatoes (Market), 
            Pack Lunch (field trip),
            Eg. feed the dog,
            Eg. Buy potatoes  (Market),
            Eg. pay bill (water),
            Eg. Buy Flowers (Anniversary)
            `
    );

    if (demo.getDemoStatus()) {
      demo.demoConversation();
    }
  }

  /**
   * Add a todo item
   * @function addNoteToList
   * @return {undefined}
   */
  static addNoteToList() {
    document.querySelector("input[type='text']").addEventListener('keyup', (event) => {
      // when enter is pressed
      if (event.which === 13) {
        // remove all demo data from storage
        demo.setDemoStorage([]);
        // prevent submission of empty or space only entry
        if (event.target.value.trim() === '') {
          info('You Must Enter Something First!');
          // ensure every incorrect attempt shows an animation
          setTimeout(() => {
            $("input[type='text']").removeClass('shake');
          }, 401);
          return;
        }
        $("input[type='text']").removeClass('shake');

        // remove demo values if valid submission is being entered
        demo.setDemoStatus(false);
        // clear UI
        UI.clearTodos();

        manageCreatedTodos.getInput(escapeHtml(event.target.value.trim()));
        // update UI
        UI.showTodos();

        // clear field after enter
        event.target.value = '';
      }
    });
  }

  /**
   * Removes todos from UI
   * @function clearTodos
   * @return {undefined}
   */
  static clearTodos() {
    const ul = document.querySelector('.app-container ul');
    // faster than setting innerHtml=''
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  }
}
