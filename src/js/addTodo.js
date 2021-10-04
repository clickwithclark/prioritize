import { createOneTodo } from './createOneTodo.js';
import { createManyTodos } from './createManyTodos.js';
import { processGroupedTodos } from './processGroupedTodos.js';
import { feedbackMessage } from './feedbackMessage.js';

export function addTodo() {
  const message = document.querySelector('#todoInput').value.trim();

  if (message.indexOf(',') === -1) {
    return createOneTodo(message);
  }
  // since user is entering multiple,check for list group as well

  // entry matches the format '(category):' regardless of spaces around ':'
  const listGrouping = message.match(/^\(.*\):|^\(.*\)\s:/i);
  // split imput string at the last pair of parentheses
  const multiEntry = message.split(/(\(([^)]*)\)[^)]*$)/);
  // regular multi entry: (abc)task1,(efg)task2 => [abc] task1 ...[efg]task2
  const regularTodos = multiEntry[0];
  // grouped multi entry: (abc):task1,task2=>(abc)task1,(abc)task2
  const groupedTodos = multiEntry[1];

  if (listGrouping) {
    /** At this point we know the user has chosen multi entry
     * and that they have chosen to use grouping.
     * We do not know where in their string they placed the grouping
     * since all tasks after grouping will belong to that group, we can
     * assume it is made before using multi entry grouping so
     * a check is made to handle potential preceding tasks.
     *
     * If our assumptions are incorrect throw an error
     */

    // split into 2 groups and handle separately
    // 1 group means their are no preeceeding entries
    // and it was purely a grouped multi entry attempt
    try {
      if (regularTodos.length === 0) {
        const groupedTasks = processGroupedTodos(groupedTodos);
        return createManyTodos(groupedTasks);
      }

      // assume 2 sets of entries grouped and ungrouped
      const grouped = processGroupedTodos(groupedTodos);
      const allTodos = `${regularTodos}${grouped}`;
      return createManyTodos(allTodos);
    } catch (error) {
      feedbackMessage(`${error.message}inside`, 12);
    }
  }

  return createManyTodos(message);
}
