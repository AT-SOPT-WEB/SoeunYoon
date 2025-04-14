import { todos as initialTodos } from './data.js';

let todos = JSON.parse(localStorage.getItem('todos')) || initialTodos;
localStorage.setItem('todos', JSON.stringify(todos));

// 커스텀 알럿 모달 표시 함수
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

// 테이블 렌더링 함수
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

    // Drag & Drop 이벤트 등록
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


// 중요도 드롭다운 토글 (필터)
window.toggleDropdown = () => {
  const dropdown = document.getElementById('priority-dropdown');
  dropdown.classList.toggle('show');
};

// 중요도 드롭다운 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
  const dropdownWrapper = document.querySelector('.dropdown');
  const dropdown = document.getElementById('priority-dropdown');

  if (!dropdownWrapper.contains(e.target)) {
    dropdown.classList.remove('show');
  }
});

// 중요도 선택 드롭다운 (입력) 토글
window.toggleSelectDropdown = function () {
  const dropdown = document.getElementById("select-dropdown");
  dropdown.classList.toggle("show");
};

// 중요도 선택 드롭다운에서 값 선택
window.selectPriority = function (priority) {
  const selectedText = document.getElementById("selected-priority");
  selectedText.textContent = priority;
  document.getElementById("select-dropdown").classList.remove("show");
};

// 할 일 추가 버튼 클릭 이벤트
document.getElementById('add-btn').addEventListener('click', () => {
  const title = document.getElementById('todo-input').value.trim();
  const priorityText = document.getElementById('selected-priority').textContent.trim();
  const priority = ['1', '2', '3'].includes(priorityText) ? priorityText : '';

  if (!title || !priority) {
    return showAlert('모든 값을 입력해주세요!', '입력 누락');
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

// 필터링 함수 (전체 / 완료됨 / 미완료)
window.filterTodos = (type) => {
  if (type === 'completed') renderTable(todos.filter(t => t.completed));
  else if (type === 'incomplete') renderTable(todos.filter(t => !t.completed));
  else renderTable();
};

// 중요도 필터 함수
window.filterPriority = (priority) => {
  renderTable(todos.filter(t => t.priority == priority));
};

// 선택 항목 삭제 처리 함수
window.deleteTodos = () => {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
  const ids = Array.from(checkboxes).map(cb => +cb.dataset.id);
  todos = todos.filter(todo => !ids.includes(todo.id));
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTable();
};

// 선택 항목 완료 처리 함수
window.completeTodos = () => {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
  const ids = Array.from(checkboxes).map(cb => +cb.dataset.id);

  const hasCompleted = todos.some(t => ids.includes(t.id) && t.completed);
  if (hasCompleted) return showAlert('이미 완료된 항목이 포함되어 있습니다.', '중복 완료');

  todos = todos.map(todo => ids.includes(todo.id) ? { ...todo, completed: true } : todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTable();
};

// 전체 선택 / 해제 토글 함수
window.toggleAll = (el) => {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = el.checked);
};

// Drag & Drop
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
