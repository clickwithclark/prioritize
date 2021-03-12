import {localStorageIdGenerator} from './localStorageIDGenderator.js'
import  { demo}  from "./demo.js";
import {Todo} from './Todo.js'
/**
 * @function manageCreatedTodos
 *
 * @return {Object}  Object with closure on an array called list
 */
 export const manageCreatedTodos = (function () {
    let list = [];
    let demo;
  
    return {
      /**
       *Add a todo to storage by retrieving data from localStorage store in manageCreatedTodos's
       * list array, appends new Todo to the list, saves updated list to localStorage
       * @param  {Todo} message - accepts the content of the todo
       * @return {Boolean} result - success as true and failure as false
       */
      createOneTodo(message) {
        let category;
  
        // check for the presence of categories
        if (message.indexOf('(') !== -1) {
          category = message.match(/\((.*)\)/).pop();
          // remove category from being included in a todo body
          message = message.replace(`(${category})`, '');
          //  message += escapeHtml(message);
        }
  
        const todo = new Todo(message, category);
        list.push(todo.summary);
  
        return this.save();
      },
      createManyTodos(note) {
        const list = note.split(',');
        list.forEach((listItem) => {
          manageCreatedTodos.createOneTodo(listItem);
        });
      },
  
      /**
       *@return {Number} the number of todo NOT committed to storage
       */
      count() {
        return list.length;
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
        let idDoesExist = false;
        this.getListOfTodo();
        list.filter((listObject) => {
          if (listObject.id == id) {
            return (idDoesExist = true);
          }
        });
  
        if (idDoesExist) {
          list = list.filter((listObject) => listObject.id != id);
          return this.save();
        }
        return false;
      },
      
      removeAll() {
        localStorage.removeItem('todos');
        list = [];
      },
      /**
       * @function show
       * @return {Array} An array of all todos from local Storage
       */
      getListOfTodo() {
        list = JSON.parse(localStorage.getItem('todos')) || [];
        // when all todo's are deleted, reset id number generator
        if (list.length === 0) {
          localStorageIdGenerator.reset();
        }
  
        return list;
      },
      /**
       * Stores whatever todos are in list array to localStorage
       * @return {Boolean} success as true and failure as false
       */
      save() {
        localStorage.setItem('todos', this.formatForLocalStorage(list));

        return (this.getListOfTodo().length>0)
  
    
      },
      /**
       * @function getInput
       * check if input is a string or a comma seperated list
       *  pass to corresponding function based on the input method chosen
       * @param  {note} note {description}
       * @return {type} {description}
       */
      getInput(note) {
        if (note.indexOf(',') === -1) {
  
          return this.createOneTodo(note);
        }
        return this.createManyTodos(note);
      },

  
      set(newList) {
        /* if its a demo, use demo storage not main storage */
  
        if (newList.length < 1) {
          // throw new Error('The list passed is empty');
          // use demo items since there is nothing in storage
          list = demo.getDemoStorage();
          return;
        }
        list = newList;
        this.save();
  
        const aList = this.getListOfTodo();
  
        if (aList.length > 0) {
          return true;
        }
  
        return false;
      },
      update(id, note, category = undefined) {
        const updateCategory = category == undefined ? '' : `[${category}]`;
  
        const newNote = `<span><i class="far fa-check-square"></i></span> ${updateCategory} ${note} <span class="grip"><i class="fas fa-arrows-alt-v"></i></span>`;
        let idDoesExist = false;
        this.getListOfTodo();
        list.filter((listObject) => {
          if (listObject.id == id) {
            return (idDoesExist = true);
          }
        });
  
        if (idDoesExist) {
          list.map((listObject) => {
            if (listObject.id === id) {
              listObject.category = category;
              listObject.note = newNote;
            }
          });
          return this.save();
        }
        return false;
      },
      setCompletedState(id) {
        /* ignore if in demo mode */
        if (demo.getDemoStorage() > 1) {
          return;
        }
        let idDoesExist = false;
        this.getListOfTodo();
        list.filter((listObject) => {
          if (listObject.id == id) {
            return (idDoesExist = true);
          }
        });
  
        if (idDoesExist) {
          list.map((listObject) => {
            if (listObject.id === id) {
              listObject.isCompleted = !listObject.isCompleted && true;
            }
          });
          return this.save();
        }
      },
    };
  })({});