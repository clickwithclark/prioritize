import { getState, saveState } from './localStorage';


export function saveTodoOrder(sortedTodos) {
  const state = { ...getState() };
  const order = [];
  sortedTodos.forEach((element) => {
    order.push(+element[0]);
  });
  state.order = order;
  saveState(state);
}
