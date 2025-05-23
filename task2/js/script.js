import { getStoredTodos, saveTodos } from './storage.js';
import { createCompletedIcon } from './icon.js';
import { MESSAGES } from './messages.js';
import { showAlert } from './alert.js';
import { getSelectedTodoIds } from '../utils/domUtils.js';

let todos = getStoredTodos();
saveTodos(todos); 

function createTableRow(todo) {
  const row = document.createElement('tr');
  row.setAttribute('draggable', true);
  row.setAttribute('data-id', todo.id);

  const checkboxTd = document.createElement('td');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.dataset.id = todo.id;
  checkboxTd.appendChild(checkbox);

  const priorityTd = document.createElement('td');
  priorityTd.textContent = todo.priority;


  const completedTd = document.createElement('td');
  const completedIcon = createCompletedIcon(todo.completed);
  completedTd.appendChild(completedIcon);
  
  const titleTd = document.createElement('td');
  titleTd.textContent = todo.title;

  row.append(checkboxTd, priorityTd, completedTd, titleTd);

  return row;
}

function renderTable(data = todos) {
  const table = document.getElementById('todo-body');
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }  

  data.forEach(todo => {
    const row = createTableRow(todo);

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
  selectedText.textContent = String(priority);

  document.getElementById("select-dropdown").classList.remove("show");
}

function filterTodos(type) {
  if (type === 'completed') renderTable(todos.filter(t => t.completed));
  else if (type === 'incomplete') renderTable(todos.filter(t => !t.completed));
  else renderTable();
}

function filterPriority(priority) {
  renderTable(todos.filter(t => t.priority === Number(priority)));
}

function deleteTodos() {
  const ids = getSelectedTodoIds();
  todos = todos.filter(todo => !ids.includes(todo.id));
  saveTodos(todos);
  renderTable();
}

function completeTodos() {
  const ids = getSelectedTodoIds();

  const hasCompleted = todos.some(t => ids.includes(t.id) && t.completed);
  if (hasCompleted) return showAlert(MESSAGES.duplicate.body, MESSAGES.duplicate.title);

  todos = todos.map(todo =>
    ids.includes(todo.id) ? { ...todo, completed: true } : todo
  );
  saveTodos(todos);
  renderTable();
  showAlert(MESSAGES.success.body, MESSAGES.success.title);
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

  saveTodos(todos);
  renderTable();
}

function handleDragEnd() {
  this.classList.remove('dragging');
  const dropTarget = document.querySelector('.drop-target');
  if (dropTarget) dropTarget.classList.remove('drop-target');
}

document.getElementById('add-btn').addEventListener('click', handleAddTodo);

function handleAddTodo() {
  const title = getInputTitle();
  const priority = getInputPriority();

  if (!title || !priority) {
    return showAlert(MESSAGES.empty.body, MESSAGES.empty.title);
  }

  const newTodo = createNewTodo(title, priority);
  todos.push(newTodo);
  saveTodos(todos);
  renderTable();
  resetInputs();
}

function getInputTitle() {
  return document.getElementById('todo-input').value.trim();
}

function getInputPriority() {
  const priorityText = document.getElementById('selected-priority').textContent.trim();
  return ['1', '2', '3'].includes(priorityText) ? priorityText : '';
}

function createNewTodo(title, priority) {
  return {
    id: Date.now(),
    title,
    completed: false,
    priority: parseInt(priority),
  };
}

function resetInputs() {
  document.getElementById('todo-input').value = '';
  document.getElementById('selected-priority').textContent = '중요도 선택';
}


document.addEventListener('click', (e) => {
  const dropdownWrapper = document.querySelector('.dropdown');
  const dropdown = document.getElementById('priority-dropdown');
  if (dropdown && !dropdownWrapper.contains(e.target)) {
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