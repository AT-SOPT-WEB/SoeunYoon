import { todos as initialTodos } from './data.js';

let todos = JSON.parse(localStorage.getItem('todos')) || initialTodos;
localStorage.setItem('todos', JSON.stringify(todos));

function renderTable(data = todos) {
  const table = document.getElementById('todo-body');
  table.innerHTML = '';

  data.forEach(todo => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="checkbox" data-id="${todo.id}" /></td>
      <td>${todo.priority}</td>
      <td>${todo.completed ? '✅' : '❌'}</td>
      <td>${todo.title}</td>
    `;

    row.setAttribute('draggable', true);
    row.setAttribute('data-id', todo.id);
    row.addEventListener('dragstart', handleDragStart);
    row.addEventListener('dragover', handleDragOver);
    row.addEventListener('drop', handleDrop);
    row.addEventListener('dragend', handleDragEnd);

    table.appendChild(row);
  });
}
renderTable();

document.getElementById('add-btn').addEventListener('click', () => {
  const title = document.getElementById('todo-input').value.trim();
  const priority = document.getElementById('priority-select').value;

  if (!title || !priority) return alert('모든 값을 입력해주세요!');

  const newTodo = {
    id: Date.now(),
    title,
    completed: false,
    priority: parseInt(priority)
  };
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTable();
  document.getElementById('todo-input').value = '';
  document.getElementById('priority-select').value = '';
});

window.filterTodos = (type) => {
  if (type === 'completed') renderTable(todos.filter(t => t.completed));
  else if (type === 'incomplete') renderTable(todos.filter(t => !t.completed));
  else renderTable();
};

window.filterPriority = (priority) => {
  renderTable(todos.filter(t => t.priority == priority));
};

window.deleteTodos = () => {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
  const ids = Array.from(checkboxes).map(cb => +cb.dataset.id);
  todos = todos.filter(todo => !ids.includes(todo.id));
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTable();
};

window.completeTodos = () => {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
  const ids = Array.from(checkboxes).map(cb => +cb.dataset.id);

  const hasCompleted = todos.some(t => ids.includes(t.id) && t.completed);
  if (hasCompleted) return alert('이미 완료된 항목이 포함되어 있습니다.');

  todos = todos.map(todo => ids.includes(todo.id) ? { ...todo, completed: true } : todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTable();
};

window.toggleAll = (el) => {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = el.checked);
};

let dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
  this.classList.add('dragging');
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  if (!dragSrcEl || dragSrcEl === this) return;

  const srcId = +dragSrcEl.getAttribute('data-id');
  const targetId = +this.getAttribute('data-id');

  const srcIndex = todos.findIndex(todo => todo.id === srcId);
  const targetIndex = todos.findIndex(todo => todo.id === targetId);

  const [movedItem] = todos.splice(srcIndex, 1);
  todos.splice(targetIndex, 0, movedItem);

  localStorage.setItem('todos', JSON.stringify(todos));
  renderTable();
}

function handleDragEnd() {
  this.classList.remove('dragging');
}