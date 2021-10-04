import { getState, saveState } from './localStorage';


export function saveDOMOrder() {
  const listOfTodos = [...document.querySelectorAll('li')];
  const listOfIds = [];
  listOfTodos.forEach((item) => {
    listOfIds.push(+item.dataset.id);
  });

  const state = getState();
  if (listOfIds.length > 0) {
    state.order = listOfIds;
    saveState(state);
  }
}
