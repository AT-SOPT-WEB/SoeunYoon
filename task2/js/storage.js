import { todos as initialTodos } from './data.js';

const STORAGE_KEY = 'todos';

export function getStoredTodos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : initialTodos;
}

export function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
