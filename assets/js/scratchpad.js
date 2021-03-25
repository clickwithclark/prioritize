/* eslint-disable no-inner-declarations */
{
  function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (event) => {
      if (event.target.matches(selector)) {
        callback(event);
      }
    });
  }

  function editTodo(e) {
    const listItemToEdit = e.target.closest('li');
    const { id } = listItemToEdit.dataset;
    const messageNode = listItemToEdit.querySelector('.main-message');
    // const currentMessage = messageNode.innerText;
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
    console.log('(messageNode.childNodes[0]', messageNode.childNodes[0]);
    const range = document.createRange();
    range.setStart(messageNode.childNodes[0], halfwayPoint);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    // document.createRange().setStart(messageSpan.)

    messageNode.addEventListener('keydown', (event) => {
      // if enter is pressed
      if (event.which === 13) {
        event.preventDefault();
        messageNode.contentEditable = false;
        messageNode.style.backgroundColor = 'inherit';
        messageNode.style.color = 'inherit';
      }
    });
  }

  function initializeEventListeners() {
    // entering todo info
    addGlobalEventListener('keyup', '#todoInput', (event) => {
      // when enter is pressed
      if (event.which === 13) {
        try {
          addTodo();
        } catch (error) {
          console.error(error);
        }
      }
    });

    // editing existing todo
    addGlobalEventListener('pointerup', '.fa-edit', editTodo);
  }

  const list = document.querySelector('#todoList');
  function addTodoToDOM(todo) {
    const item = document.createElement('li');
    const checkmarkSpan = document.createElement('span');
    const checkmarkIcon = document.createElement('i');
    const gripSpan = document.createElement('span');
    const gripIcon = document.createElement('i');
    const editSpan = document.createElement('span');
    const editIcon = document.createElement('i');
    const messageSpan = document.createElement('span');
    //
    checkmarkSpan.appendChild(checkmarkIcon);
    gripSpan.appendChild(gripIcon);
    editSpan.appendChild(editIcon);
    editIcon.className = 'fas fa-edit';
    gripIcon.className = 'fas fa-arrows-alt-v';
    checkmarkIcon.className = 'far fa-check-square';
    messageSpan.className = 'main-message';

    // build html elements
    item.appendChild(messageSpan);
    item.dataset.id = todo.id;
    messageSpan.innerText = `[${todo.category}] ${todo.message}`;
    item.insertAdjacentElement('afterbegin', checkmarkSpan);
    item.insertAdjacentElement('beforeend', gripSpan);
    item.insertAdjacentElement('beforeend', editSpan);
    list.append(item);
  }
  const someTodo = {
    id: 7777,
    message: 'this is a message',
    date: new Date(),
    category: 'Kitchen',
  };

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  const escapeHtml = (text) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      // eslint-disable-next-line quotes
      "'": '&#039;',
    };

    return text.replace(/[&<>"']/g, (m) => map[m]);
  };
  function generateID() {
    return Math.floor(Math.random() * 100000000);
  }

  function processTodo(message) {
    let category;
    let note;
    // check for the presence of categories
    // by checking for parenthesis
    if (message.indexOf('(') !== -1) {
      category = message.match(/\((.*)\)/).pop();
      // remove category from being included in a todo body
      note = message.replace(`(${category})`, '');
      note = escapeHtml(note);
    }

    category = capitalizeFirstLetter(category);
    const TODO = {
      id: generateID,
      message,
      date: new Date(),
      category,
    };
    return TODO;
  }
  function retrieveFromLocalStorage() {
    const localStorageTodos = JSON.parse(localStorage.getItem('todos'));

    return localStorageTodos !== null ? localStorageTodos : {};
  }
  function addToLocalStorage(givenTodo) {
    // get current stored todos first then append new todo
    const currentStored = retrieveFromLocalStorage();

    Object.assign(currentStored, { [givenTodo.id]: givenTodo });

    localStorage.setItem('todos', JSON.stringify(currentStored));
  }
  function createOneTodo(message) {
    const TODO = processTodo(message);
    addToLocalStorage(TODO);
  }

  addTodoToDOM(someTodo);
  document.body.append(list);

  initializeEventListeners();
}
