const input = document.getElementById('todoInput');
const button = document.getElementById('addBtn');
const list = document.getElementById('todoList');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

todos.forEach((todo) => {
const li = document.createElement('li');
li.textContent = todo;
todoList.appendChild(li);
});

button.addEventListener('click', () => {
const value = input.value.trim();
if (value !== '') {
    const li = document.createElement('li');
    li.textContent = value;
    list.appendChild(li);
    input.value = '';
    input.focus(); 

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(value);
    localStorage.setItem("todos", JSON.stringify(todos));
}
});