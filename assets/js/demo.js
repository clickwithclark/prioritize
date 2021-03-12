
import {manageCreatedTodos} from './manageCreatedTodos.js';
import {localStorageIdGenerator} from './localStorageIDGenderator.js';
import {UI} from './UI.js';
/**
 * @function sayToUser
 * @param  {String} message - message for logo to talk
 * @param  {Number} time    - number of seconds for message to be displayed
 * @return {Promise} 
 */

export function sayToUser(message, time) {
  return new Promise((resolve) => {
    (function talk() {
       document.querySelector('#info-message').textContent =message;
      // $('#info-message').text(message);
      document.querySelector('#info-bubble').style.visibility="visible";
      // $('#info-bubble').css('visibility', 'visible');
      // hide message after 3 seconds
      setTimeout(() => {
        document.querySelector('body').scrollTop=0;
        document.querySelector('#info-bubble').style.visibility='hidden'
        // $('#info-bubble').css('visibility', 'hidden');
        resolve();
        //*1000 to convert to milliseconds for setTimeout
      }, (time*1000));
    })();
  });
}

function checkForUserInput() {
  if (!demo.getDemoStatus()) {
    throw new Error('Demo Interrupted');
  }
}



/**
 *quickly build array of list items to populate UI as default
 * @function demo
 * @return {Object} Object containing methods @function setDemoStatus
*/
export const demo = (function () {
    let inDemoMode = true;
    let demoStorage = [];
    let todoManager;
    let uiManager;
  
    return {
      /**
       * Sets the demo status
       * @function setDemoStatus
       * @param  {Boolean}  currentState represents the demo status
       * @return {Void}
       */
      setDemoStatus(currentState) {
        inDemoMode = currentState;
      },
      /**
       * Retrieves the demo status
       * @function getDemoStatus
       * @return {Boolean} The current demo status
       */
      getDemoStatus() {
        return inDemoMode;
      },
      getDemoStorage() {
        return demoStorage;
      },
      setDemoStorage(list) {
        demoStorage = list;
      },
      stopDemo() {
        
          demo.setDemoStatus(false);
        },
        getTodoManager() {
          return todoManager;
        },
        setTodoManager(todoManagerPassed) {
         todoManager = todoManagerPassed;
        },
        setUIManager(uiManagerPassed){
          uiManager = uiManagerPassed;
        },
      /**
       * Populates UI with default todos as a demo of the app
       * if no todos are found in storage
       * @function runDemo
       * @param  {Array} ...listOfDemoTodos Takes a list of todos
       * @return {Void}
       */
      runDemo(...listOfDemoTodos) {
      try {
        demo.setTodoManager(manageCreatedTodos);
        demo.setUIManager(UI);
      if (!todoManager) {
        throw new Error("TodoManager not found")
      }
      if (!uiManager) {
        throw new Error("UI Manager not found")
      }
      todoManager.getInput(listOfDemoTodos.toString());
        demoStorage = [...todoManager.getListOfTodo()];
        //clear localStorage from todos and reset id generator
        todoManager.removeAll();
        localStorageIdGenerator.reset();
        uiManager?.showTodos(demoStorage);
      } catch (err) {
        console.error(err);
        //log error.stack with log function
      }
      },
      demoConversation: async function preparedConversationDemo() {
        document.querySelector("input[type='text']").addEventListener('keypress', demo.stopDemo);
        while (demo.getDemoStatus()) {
          checkForUserInput();
          await sayToUser('Hello There, thanks for checking out demo project', 4);
          checkForUserInput();
          await sayToUser('You can use the example task list below to get familiar with the controls', 5);
          checkForUserInput();
          document.querySelector('.date-sort > svg').classList.add('intro');
          checkForUserInput();
          await sayToUser('The First button lets you sort by date', 5);
          checkForUserInput();
          document.querySelector('.category-button > svg').classList.add('intro');
          checkForUserInput();
          await sayToUser('The Second button lets you sort by category', 5);
          checkForUserInput();
          document.querySelector('.drop-down-entry > svg').classList.add('intro');
  
          checkForUserInput();
          popFadeOut("input[type='text']");
          checkForUserInput();
          await sayToUser('Finally to add a new task, use the add button...enjoy!', 5);
        }
  
        document.querySelector("input[type='text']").removeEventListener('keypress', demo.stopDemo);
      },
    };
  })();

  /* -------------------------------------------------------------------*/
// #region of .pop-out-fade-out
/* -------------------------------------------------------------------*/
/**
 * @function popFadeOut
 * @param  {String} selector -eg.#id,.className etc
 * @return {Void} 
 */
function popFadeOut(selector){
  const element= document.querySelector(selector);
  element.classList.toggle('pop-out-fade-out');
}




/* -------------------------------------------------------------------*/
//#endregion of .pop-out-fade-out