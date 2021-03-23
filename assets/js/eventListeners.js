import { editTodo } from "./updateTodo";

const input= document.querySelector('#todoInput');
export function initializeEventListeners(){
/**
* @function addGlobalEventListener
* @param  {String} type - Event type eg. 'click'
* @param  {String} selector - CSS selector eg. '#id', '.class'
* @param  {Function} callback - Function
*
*/
export function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (event) => {
      if (e.target.matches(selector)) {
        callback(e);
      }
    });
  }

  addGlobalEventListener('keyup', input, (event) => {
      // when enter is pressed
        if (event.which==13) {
            try {
                addTodo()
            } catch (error) {
                console.error(error)
            }
        }
  });
}

function addEditBtnEventListener(e){
  document.addEventListener('pointerup', (e) => {
    editTodo(e);
  })  
}