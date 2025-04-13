// Seleciona todas as opções de biotipo
const biotipoOptions = document.querySelectorAll(".biotipo-option");

// Função para remover a classe 'selected' de todas as opções
function deselectAll() {
  biotipoOptions.forEach((option) => {
    option.classList.remove("selected");
  });
}

// Adiciona evento de clique para cada opção
biotipoOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // Remove a seleção anterior
    deselectAll();

    // Adiciona a classe 'selected' à opção clicada
    option.classList.add("selected");

    // Marca o input de rádio correspondente como selecionado
    const radioInput = option.querySelector('input[type="radio"]');
    if (radioInput) {
      radioInput.checked = true;
    }
  });
});
