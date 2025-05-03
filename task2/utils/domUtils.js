export function getSelectedTodoIds() {
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => +cb.dataset.id);
  }
  