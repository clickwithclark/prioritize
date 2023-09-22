import { observeUserState } from './observeUserState.js';
import { updateDOM } from './updateDOM.js';
import { readFromDatabase } from './readFromDatabase.js';

export function init() {
  observeUserState();
  updateDOM();
}
