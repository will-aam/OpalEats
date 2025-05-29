const modal = document.getElementById("forgotPasswordModal");
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const sendResetLinkBtn = document.getElementById("sendResetLinkBtn");
const resetEmailInput = document.getElementById("reset-email"); // Input de email do modal
const loginForm = document.getElementById("loginForm");
const resetPasswordForm = document.getElementById("resetPasswordForm");

let elementThatTriggeredModal = null; // Para guardar quem abriu o modal

function openModal() {
  elementThatTriggeredModal = document.activeElement; // Guarda o elemento que tem foco
  modal.style.display = "flex";
  resetEmailInput.focus(); // Foca no primeiro input do modal
}

function closeModal() {
  modal.style.display = "none";
  if (elementThatTriggeredModal) {
    elementThatTriggeredModal.focus(); // Devolve o foco para quem abriu
  }
}

function handlePasswordReset(event) {
  event.preventDefault(); // Previne submissão padrão do formulário, se houver
  // Validação simples do e-mail (pode ser mais robusta)
  if (resetPasswordForm.checkValidity()) {
    const email = resetEmailInput.value;
    alert(`Link de recuperação enviado para ${email}! (Simulação)`);
    // Aqui você faria a chamada AJAX para o backend
    closeModal();
    resetPasswordForm.reset(); // Limpa o formulário do modal
  } else {
    // Se o formulário não for válido (ex: campo required vazio),
    // o navegador geralmente mostra uma mensagem.
    // Você pode adicionar sua própria lógica de feedback aqui se desejar.
    resetEmailInput.focus(); // Foca no campo de email se estiver inválido
  }
}

// Event Listeners
if (forgotPasswordBtn) {
  forgotPasswordBtn.addEventListener("click", openModal);
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

if (sendResetLinkBtn) {
  sendResetLinkBtn.addEventListener("click", handlePasswordReset);
}

// Fechar modal clicando fora
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.style.display === "flex") {
    closeModal();
  }
});

// Lógica para o formulário de login (exemplo)
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    // Aqui você adicionaria a lógica de login (ex: validação, chamada AJAX)
    const email = document.getElementById("email").value;
    alert(`Tentativa de login com: ${email} (Simulação)`);
  });
}
if (resetPasswordForm) {
  resetPasswordForm.addEventListener("submit", function (event) {
    handlePasswordReset(event);
  });
}
