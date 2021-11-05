export function hideScrollBar() {
  console.log('hiding');
  document.querySelector('#todoList').style.overflowY = 'hidden';
  console.log(document.querySelector('#todoList'));
}
