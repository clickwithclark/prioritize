import { escapeHtml } from './utility.js';
import { Todo } from './todo.js';

const manageCreatedTodo = (function() {
  let list = {};

  return {
    /**
     *Add a todo to storage by retrieving data from localStorage store in manageCreatedTodo's
     * list object, appends new Todo to the object, saves updated list to localStorage,
     * create list if no todo's exists
     * @param  {String} note accepts the content of the todo
     * @return {Boolean} success as true , failure as false
     */
    create(note) {
      let createdNote;
      let category;
      const newNote = {};
      // check for multiple entires
      if (note.indexOf(',') !== -1) {
        return this.createManyTodos(note);
      }
      // check for the presence of categories
      if (note.indexOf('(') !== -1) {
        category = note.match(/\((.*)\)/).pop();
        // remove category from being included in a todo body
        createdNote = note.replace(`(${category})`, '');
        createdNote = escapeHtml(createdNote);
      }

      const todo = new Todo(createdNote, category);

      newNote[todo.summary.id] = todo.summary;

      return this.save(newNote);
    },
    /**
     *Add multiple todos at with a single input string separting each 
     todo with a comma
     * create list if no todo's exists
     * @param  {String} note accepts the content of the todo
     */
    createManyTodos(note) {
      const alist = note.split(',');
      alist.forEach(listItem => {
        manageCreatedTodo.create(listItem);
      });
    },

    /**
     *@return {Number} the number of todo NOT committed to storage
     */
    count() {
      return Object.keys(list).length;
    },
    storageCount() {
      const todoDB = localStorage.getItem('todos');
      // eslint-disable-next-line eqeqeq
      if (todoDB == undefined || todoDB == 'undefined') {
        return 0;
      }
      return Object.keys(JSON.parse(localStorage.getItem('todos'))).length;
    },

    /**
     * Serializes the list of Todos that are NOT committed
     * to storage to JSON format
     * @return {String} JSON String
     */
    formatForLocalStorage() {
      return JSON.stringify(list);
    },
    /**
     * Remove a todo from storage
     * @param  {Number} id The ID number of the Todo item to remove
     * @return {Boolean} success as true and failure as false
     */
    remove(id) {
      this.show();
      if (id in list) {
        delete list[id];
        localStorage.setItem('todos', JSON.stringify(list));
        return true;
      }

      return false;
    },
    removeAll() {
      localStorage.removeItem('todos');
      list = {};
    },
    /**
     * @return {Object} An Object of all todos
     */
    show() {
      if (
        // eslint-disable-next-line eqeqeq
        localStorage.getItem('todos') == undefined ||
        // eslint-disable-next-line eqeqeq
        localStorage.getItem('todos') == 'undefined' /* empty object case */
      ) {
        return (list = {});
      }
      list = JSON.parse(localStorage.getItem('todos'));
      // when all todo's are deleted, reset id number generator
    },
    /**
     * Stores whatever todos are in list array to localStorage
     * @return {Boolean} success as true and failure as false
     */
    save(oneTodo) {
      this.show();
      this.updateStoredTodos(list, oneTodo);

      if (this.storageCount() > this.count()) {
        return true;
      }

      return false;
    },
    /**
     * @function updateStoredTodos
     * @param  {Object} list    list of todos in storage
     * @param  {Object} oneTodo single todo to add to storage
     */
    updateStoredTodos(alist, oneTodo) {
      const appendedList = { ...alist, ...oneTodo };
      localStorage.setItem('todos', JSON.stringify(appendedList));
    },
    /**
     * @function update
     * @param  {Integer} id Id of Todo to be updated
     * @param  {String} note content of Todo
     * @param  {String} category category of Todo if available
     * @param  {Boolean} isCompleted Whether a Todo was completed (true) or not(false)
     * @return {Boolean} Whether the update was completed (true) or not(false)
     * @return {Boolean} status of update
     */
    update(id, note, category = undefined) {
      // eslint-disable-next-line eqeqeq
      const updateCategory = category == undefined ? '' : category;

      // get storage version of todo

      this.show();
      const noteToUpdate = list[id];
      const updatedNote = {};
      let idDoesExist = false;
      if (noteToUpdate === undefined) {
        return idDoesExist;
      }
      idDoesExist = true;
      noteToUpdate.note = note;
      noteToUpdate.category = updateCategory;
      updatedNote[id] = noteToUpdate;
      this.updateStoredTodos(list, updatedNote);
      return idDoesExist;
    },
    setCompletedState(id) {
      this.show();
      const noteToUpdate = list[id];
      let idDoesExist = false;
      if (noteToUpdate === undefined) {
        return idDoesExist;
      }
      idDoesExist = true;
      noteToUpdate.isCompleted = !noteToUpdate.isCompleted;
      this.updateStoredTodos(list, noteToUpdate);
      return idDoesExist;
    },
  };
})();
