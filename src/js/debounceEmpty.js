
export function debounceEmpty(inputElement, callback, doneTypingInterval = 3000) {
  let typingTimer;
  clearTimeout(typingTimer);
  if (!inputElement.value) {
    typingTimer = setTimeout(callback, doneTypingInterval);
  }
}
