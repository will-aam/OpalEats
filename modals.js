// Seleciona todos os botões que abrem modals
const openModalButtons = document.querySelectorAll(".botao-info[data-modal]");
// Seleciona todos os botões de fechar
const closeModalButtons = document.querySelectorAll(".modal-close");
// Seleciona todos os overlays dos modals
const modals = document.querySelectorAll(".modal-overlay");

// Função para abrir um modal específico
function openModal(modalId) {
  // Fecha todos os modals abertos
  modals.forEach((modal) => {
    modal.style.display = "none";
  });
  // Abre o modal desejado
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex";
  }
}

// Função para fechar todos os modals
function closeAllModals() {
  modals.forEach((modal) => {
    modal.style.display = "none";
  });
}

// Adiciona evento de clique para abrir modals
openModalButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Impede a submissão do formulário
    const modalId = button.getAttribute("data-modal");
    openModal(modalId);
  });
});

// Adiciona evento de clique para fechar modals
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeAllModals();
  });
});

// Fecha o modal ao clicar no overlay (fora do conteúdo)
modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeAllModals();
    }
  });
});
