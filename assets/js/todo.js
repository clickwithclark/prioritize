export class Todo {
  constructor(note, category) {
    this.category = category === undefined ? '' : `[${category}]`;
    this.note = note;
    this.date = new Date();
    this.note = note;
    this.category = category;
    this.isCompleted = false;
    Object.defineProperties(Todo.prototype, {
      id: {
        configurable: true,
        writable: false,
        enumerable: false,
        value: Todo.prototype.getNewID(),
      },

      formattedDate: {
        value: `${new Date().getDate()}-${new Date().getMonth() +
          1}-${new Date().getFullYear()}`,
        configurable: false,
        writable: false,
        enumerable: false,
      },
    });
  }

  updateDate() {
    return (this.date = new Date());
  }

  // eslint-disable-next-line class-methods-use-this
  getNewID() {
    // eslint-disable-next-line eqeqeq
    if (localStorage.getItem('todos') == undefined) {
      return 1;
    }
    let storedId = Object.keys(JSON.parse(localStorage.getItem('todos')))
      .length;
    storedId += 1;
    return storedId;
  }

  get summary() {
    return {
      id: this.id,
      note: this.note,
      formattedDate: this.formattedDate,
      date: this.date,
      category: this.category,
      isCompleted: this.isCompleted,
    };
  }
}
