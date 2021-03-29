export function endUpdate(messageNode) {
  messageNode.contentEditable = false;
  messageNode.style.backgroundColor = 'inherit';
  messageNode.style.color = 'inherit';
}
