import { todos as initialTodos } from './data.js';

let todos = JSON.parse(localStorage.getItem('todos')) || initialTodos;
localStorage.setItem('todos', JSON.stringify(todos));

const MESSAGES = {
  empty: { title: '입력 누락', body: '모든 값을 입력해주세요!' },
  duplicate: { title: '중복 완료', body: '이미 완료된 항목이 포함되어 있습니다.' },
};

function showAlert(message, title = '알림') {
  const modal = document.getElementById('custom-alert');
  modal.classList.remove('hidden');
  modal.querySelector('.alert-title').textContent = title;
  modal.querySelector('.alert-message').textContent = message;

  const confirmBtn = modal.querySelector('.alert-confirm');
  confirmBtn.onclick = () => {
    modal.classList.add('hidden');
  };
}

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

function toggleDropdown() {
  const dropdown = document.getElementById('priority-dropdown');
  dropdown.classList.toggle('show');
}

function toggleSelectDropdown() {
  const dropdown = document.getElementById("select-dropdown");
  dropdown.classList.toggle("show");
}

function selectPriority(priority) {
  const selectedText = document.getElementById("selected-priority");
  selectedText.textContent = priority;
  document.getElementById("select-dropdown").classList.remove("show");
}

function filterTodos(type) {
  if (type === 'completed') renderTable(todos.filter(t => t.completed));
  else if (type === 'incomplete') renderTable(todos.filter(t => !t.completed));
  else renderTable();
}

function filterPriority(priority) {
  renderTable(todos.filter(t => t.priority == priority));
}

function deleteTodos() {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
  const ids = Array.from(checkboxes).map(cb => +cb.dataset.id);
  todos = todos.filter(todo => !ids.includes(todo.id));
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTable();
}

function completeTodos() {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
  const ids = Array.from(checkboxes).map(cb => +cb.dataset.id);

  const hasCompleted = todos.some(t => ids.includes(t.id) && t.completed);
  if (hasCompleted) return showAlert(MESSAGES.duplicate.body, MESSAGES.duplicate.title);

  todos = todos.map(todo => ids.includes(todo.id) ? { ...todo, completed: true } : todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTable();
}

function toggleAll(el) {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = el.checked);
}

let dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
  this.classList.add('dragging');
}

function handleDragOver(e) {
  e.preventDefault();

  const draggingRow = document.querySelector('.drop-target');
  if (draggingRow && draggingRow !== this) {
    draggingRow.classList.remove('drop-target');
  }

  if (dragSrcEl !== this) {
    this.classList.add('drop-target');
  }
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
  const dropTarget = document.querySelector('.drop-target');
  if (dropTarget) dropTarget.classList.remove('drop-target');
}

document.getElementById('add-btn').addEventListener('click', () => {
  const title = document.getElementById('todo-input').value.trim();
  const priorityText = document.getElementById('selected-priority').textContent.trim();
  const priority = ['1', '2', '3'].includes(priorityText) ? priorityText : '';

  if (!title || !priority) {
    return showAlert(MESSAGES.empty.body, MESSAGES.empty.title);
  }

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
  document.getElementById('selected-priority').textContent = '중요도 선택';
});

document.addEventListener('click', (e) => {
  const dropdownWrapper = document.querySelector('.dropdown');
  const dropdown = document.getElementById('priority-dropdown');
  if (!dropdownWrapper.contains(e.target)) {
    dropdown.classList.remove('show');
  }
});

document.getElementById('filter-all').addEventListener('click', () => filterTodos('all'));
document.getElementById('filter-completed').addEventListener('click', () => filterTodos('completed'));
document.getElementById('filter-incomplete').addEventListener('click', () => filterTodos('incomplete'));

document.getElementById('priority-toggle').addEventListener('click', toggleDropdown);
document.querySelectorAll('#priority-dropdown a').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    filterPriority(e.target.dataset.priority);
  });
});

document.getElementById('select-toggle').addEventListener('click', toggleSelectDropdown);
document.querySelectorAll('#select-dropdown li').forEach(el => {
  el.addEventListener('click', () => {
    selectPriority(el.dataset.priority);
  });
});

document.getElementById('delete-btn').addEventListener('click', deleteTodos);
document.getElementById('complete-btn').addEventListener('click', completeTodos);
document.getElementById('select-all').addEventListener('click', (e) => toggleAll(e.target));

export {
  toggleDropdown,
  toggleSelectDropdown,
  selectPriority,
  filterTodos,
  filterPriority,
  deleteTodos,
  completeTodos,
  toggleAll
};