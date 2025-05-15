/**
 * Provides a set of default todos for the application.
 * These todos are used when no tasks are stored in localStorage.
 *
 * @function getDefaultTodos
 * @returns {Object} An object containing default todo items.
 */
export function getDefaultTodos() {
  return {
    2592696: {
      id: 2592696,
      message: 'Pay electric bill', // Task description
      date: '2021-03-30T02:05:02.587Z', // Task creation date
      category: null, // No category assigned
      completed: false, // Task is not completed
    },
    12462012: {
      id: '12462012',
      message: ' feed dog', // Task description
      date: '2021-03-30T02:04:30.913Z', // Task creation date
      category: 'Chores', // Task category
      completed: false, // Task is not completed
    },
    41152409: {
      id: 41152409,
      message: 'cheese', // Task description
      date: '2021-03-30T02:03:53.599Z', // Task creation date
      category: 'Grocery', // Task category
      completed: false, // Task is not completed
    },
    53541349: {
      id: 53541349,
      message: 'milk', // Task description
      date: '2021-03-30T02:03:53.599Z', // Task creation date
      category: 'Grocery', // Task category
      completed: false, // Task is not completed
    },
    95110512: {
      id: 95110512,
      message: ' dishes', // Task description
      date: '2021-03-30T02:04:20.509Z', // Task creation date
      category: 'Chores', // Task category
      completed: false, // Task is not completed
    },
    98802921: {
      id: '98802921',
      message: "fix Timmy's bicycle", // Task description
      date: '2021-03-30T02:12:28.203Z', // Task creation date
      category: null, // No category assigned
      completed: false, // Task is not completed
    },
  };
}
