const list = document.querySelector('#todoList');
export function addTodoToDOM(todo) {
  
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
    editIcon.className="fas fa-edit"
    gripIcon.className = 'fas fa-arrows-alt-v';
    checkmarkIcon.className = 'far fa-check-square';
    messageSpan.className = 'main-message';

    // build html elements
    item.appendChild(messageSpan);
    item.dataset.id=todo.id;
    messageSpan.innerText = `[${todo.category}] ${todo.message}`;
    item.insertAdjacentElement('afterbegin', checkmarkSpan);
    item.insertAdjacentElement('beforeend', gripSpan);
    item.insertAdjacentElement('beforeend', editSpan);
    item.a
    list.append(item);
  
}
