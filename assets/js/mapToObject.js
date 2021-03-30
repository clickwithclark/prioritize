export function mapToObject(localStorageMappedTodos) {
  const localStorageTodos = {};
  for (const [key, value] of localStorageMappedTodos) {
    localStorageTodos[key] = value;
  }
  return localStorageTodos;
}
