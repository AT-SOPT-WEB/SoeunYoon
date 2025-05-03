export function showAlert(message, title = '알림') {
    const modal = document.getElementById('custom-alert');
    modal.classList.remove('hidden');
    modal.querySelector('.alert-title').textContent = title;
    modal.querySelector('.alert-message').textContent = message;
  
    const confirmBtn = modal.querySelector('.alert-confirm');
    confirmBtn.onclick = () => {
      modal.classList.add('hidden');
    };
  }
  