// modals.js
// Seleciona todos os botões que abrem modals
const openModalButtons = document.querySelectorAll(".botao-info[data-modal]");
// Seleciona todos os botões de fechar
const closeModalButtons = document.querySelectorAll(".modal-close");
// Seleciona todos os overlays dos modals
const modals = document.querySelectorAll(".modal-overlay");

// Armazena o elemento que abriu o modal para restaurar o foco
let lastFocusedElement;

// Função para abrir um modal específico
function openModal(modalId) {
  // Fecha todos os modals abertos
  modals.forEach((modal) => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });

  // Abre o modal desejado
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    const closeButton = modal.querySelector(".modal-close");
    if (closeButton) {
      closeButton.focus(); // Move o foco para o botão de fechar
    }
    trapFocus(modal); // Mantém o foco dentro do modal
  }
}

// Função para fechar todos os modals
function closeAllModals() {
  modals.forEach((modal) => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });
  if (lastFocusedElement) {
    lastFocusedElement.focus(); // Restaura o foco ao elemento que abriu
  }
}

// Função para manter o foco dentro do modal
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  modal.addEventListener("keydown", function handler(e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
    // Remove o listener quando o modal for fechado
    if (modal.style.display === "none") {
      modal.removeEventListener("keydown", handler);
    }
  });
}

// Adiciona evento de clique para abrir modals
openModalButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Impede a submissão do formulário
    lastFocusedElement = button; // Salva o botão que abriu
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

// Fecha o modal com a tecla Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modals.forEach((modal) => {
      if (modal.style.display === "flex") {
        closeAllModals();
      }
    });
  }
});
