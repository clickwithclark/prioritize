import { getState, saveState } from './localStorage';

export function clearUpdateConfig() {
  let state = getState();
  state = state ?? {};
  state.updateConfig = null;
  saveState(state);
}
