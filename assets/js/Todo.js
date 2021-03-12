import {localStorageIdGenerator} from './localStorageIDGenderator.js'
export class Todo {
  constructor(note, category = undefined) {
    category = category === undefined ? '' : `[${category}]`;
    const generatedId = localStorageIdGenerator.getNewID();

    Object.defineProperties(this, {
      id: {
        value: generatedId,
        writable: false,
        configurable: false,
      },
      date: { value: new Date() },
      formattedDate: {
        value: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
      },
      note: {
        // eslint-disable-next-line max-len
        value: (note = `<span><i class="far fa-check-square"></i></span> ${category} ${note} <span class="grip"><i class="fas fa-arrows-alt-v"></i></span>`),
      },
      category: {
        value: category,
      },
    });
  }

  get summary() {
    const aTodo = {
      id: this.id,
      note: this.note,
      formattedDate: this.formattedDate,
      date: this.date,
      category: this.category,
    };
    return aTodo;
  }
}
