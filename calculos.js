// Função para recomendar a fórmula com base em biotipo e objetivos
function recomendarFormula(biotipo, objetivos, gordura) {
  let recomendacao = "";

  // Prioridade para Katch-McArdle se percentual de gordura estiver disponível
  if (gordura) {
    if (
      biotipo === "ectomorfo" ||
      objetivos.includes("hipertrofia") ||
      objetivos.includes("forca") ||
      objetivos.includes("endurance")
    ) {
      recomendacao =
        "Katch-McArdle é a mais indicada, pois usa sua massa magra, ideal para ectomorfos, hipertrofia, força ou resistência.";
    } else if (biotipo === "endomorfo" && objetivos.includes("emagrecer")) {
      recomendacao =
        "Katch-McArdle é recomendada, pois considera a massa magra e evita superestimar a TMB em endomorfos que buscam emagrecer.";
    } else {
      recomendacao =
        "Katch-McArdle é uma boa escolha por usar sua massa magra, mas Mifflin-St Jeor também é confiável para objetivos gerais.";
    }
  } else {
    // Sem percentual de gordura
    if (biotipo === "endomorfo" && objetivos.includes("emagrecer")) {
      recomendacao =
        "Mifflin-St Jeor é a melhor opção para endomorfos em busca de emagrecimento, pois evita superestimar a TMB.";
    } else if (
      biotipo === "ectomorfo" &&
      (objetivos.includes("hipertrofia") || objetivos.includes("aumentar"))
    ) {
      recomendacao =
        "Mifflin-St Jeor é indicada para ectomorfos visando hipertrofia ou ganho de peso, mas Katch-McArdle seria ideal com dados de massa magra.";
    } else if (
      objetivos.includes("forca") ||
      objetivos.includes("endurance") ||
      objetivos.includes("velocidade")
    ) {
      recomendacao =
        "Mifflin-St Jeor é confiável para objetivos de performance, com fatores de atividade ajustados. Katch-McArdle seria mais precisa com massa magra.";
    } else if (
      objetivos.includes("flexibilidade") ||
      objetivos.includes("manter")
    ) {
      recomendacao =
        "Mifflin-St Jeor ou Harris-Benedict são suficientes para manutenção ou flexibilidade, já que a composição corporal tem menos impacto.";
    } else {
      recomendacao =
        "Mifflin-St Jeor é a escolha padrão, adequada para a maioria dos objetivos e biótipos sem dados de massa magra.";
    }
  }

  return recomendacao;
}

// Função principal para calcular TMB e GET
function calcularTMB(formula) {
  // Captura os valores do formulário
  const sexo = document.getElementById("sexo").value;
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const idade = parseInt(document.getElementById("idade").value);
  const gordura = parseFloat(document.getElementById("gordura").value) || null;
  const atividade = document.getElementById("atividade").value;
  const biotipo =
    document.querySelector('input[name="biotipo"]:checked')?.value || null;
  const objetivos = Array.from(
    document.querySelectorAll('input[name="objetivos[]"]:checked')
  ).map((input) => input.value);

  // Validação dos campos obrigatórios
  if (!sexo || isNaN(peso) || isNaN(altura) || isNaN(idade) || !atividade) {
    mostrarErroModal(
      "Por favor, preencha todos os campos obrigatórios (sexo, peso, altura, idade e nível de atividade)."
    );
    return;
  }

  // Validação específica para Katch-McArdle
  if (formula === "katch-mcardle" && !gordura) {
    mostrarErroModal(
      "A fórmula Katch-McArdle requer o percentual de gordura corporal. Por favor, informe-o ou escolha outra fórmula."
    );
    return;
  }

  let tmb;

  // Cálculo da TMB com base na fórmula escolhida
  switch (formula) {
    case "harris-benedict":
      if (sexo === "masculino") {
        tmb = 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * idade;
      } else {
        tmb = 447.593 + 9.247 * peso + 3.098 * altura - 4.33 * idade;
      }
      break;

    case "mifflin-st-jeor":
      tmb = 10 * peso + 6.25 * altura - 5 * idade;
      if (sexo === "masculino") {
        tmb += 5;
      } else {
        tmb -= 161;
      }
      break;

    case "katch-mcardle":
      const massaMagra = peso * (1 - gordura / 100);
      tmb = 370 + 21.6 * massaMagra;
      break;

    case "oms":
      if (sexo === "masculino") {
        if (idade >= 18 && idade <= 30) tmb = 15.3 * peso + 679;
        else if (idade <= 60) tmb = 11.6 * peso + 879;
        else tmb = 11.9 * peso + 700;
      } else {
        if (idade >= 18 && idade <= 30) tmb = 14.7 * peso + 496;
        else if (idade <= 60) tmb = 8.7 * peso + 829;
        else tmb = 10.5 * peso + 596;
      }
      break;

    case "owen":
      if (sexo === "masculino") {
        tmb = 879 + 10.2 * peso;
      } else {
        tmb = 795 + 7.18 * peso;
      }
      break;

    case "henry":
      if (sexo === "masculino") {
        if (idade >= 18 && idade <= 30) tmb = 14.7 * peso + 678;
        else if (idade <= 60) tmb = 13.0 * peso + 747;
        else tmb = 13.5 * peso + 514;
      } else {
        if (idade >= 18 && idade <= 30) tmb = 10.5 * peso + 615;
        else if (idade <= 60) tmb = 9.7 * peso + 595;
        else tmb = 9.8 * peso + 520;
      }
      break;

    default:
      mostrarErroModal("Fórmula inválida.");
      return;
  }

  // Fator de atividade para calcular GET
  let fatorAtividade;
  switch (atividade) {
    case "sedentario":
      fatorAtividade = 1.2;
      break;
    case "leve":
      fatorAtividade = 1.375;
      break;
    case "moderado":
      fatorAtividade = 1.55;
      break;
    case "intenso":
      fatorAtividade = 1.725;
      break;
    case "muito-intenso":
      fatorAtividade = 1.9;
      break;
    default:
      fatorAtividade = 1.2;
  }

  // Cálculo do GET
  const get = tmb * fatorAtividade;

  // Obter recomendação de fórmula
  const recomendacao = recomendarFormula(biotipo, objetivos, gordura);

  // Exibir resultado no modal
  mostrarResultadoModal(formula, tmb, get, recomendacao);
}

// Função para exibir erro no modal
function mostrarErroModal(mensagem) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
      <div class="modal-content">
          <button type="button" class="modal-close">x</button>
          <h4>Erro</h4>
          <p>${mensagem}</p>
      </div>
  `;

  document.body.appendChild(modal);
  modal.style.display = "flex";

  const closeButton = modal.querySelector(".modal-close");
  closeButton.addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Função para exibir o modal com os resultados
function mostrarResultadoModal(formula, tmb, get, recomendacao) {
  // Capitalizar o nome da fórmula para exibição
  const formulaNome = formula
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Criar o modal dinamicamente
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
      <div class="modal-content">
          <button type="button" class="modal-close">x</button>
          <h4>Resultado - Fórmula ${formulaNome}</h4>
          <p><strong>Taxa Metabólica Basal (TMB):</strong> ${tmb.toFixed(
            2
          )} calorias/dia</p>
          <p><strong>Gasto Energético Total (GET):</strong> ${get.toFixed(
            2
          )} calorias/dia</p>
          <p><strong>Recomendação:</strong> ${recomendacao}</p>
      </div>
  `;

  // Adicionar o modal ao corpo da página
  document.body.appendChild(modal);

  // Mostrar o modal
  modal.style.display = "flex";

  // Fechar o modal ao clicar no botão "x"
  const closeButton = modal.querySelector(".modal-close");
  closeButton.addEventListener("click", () => {
    modal.remove();
  });

  // Fechar o modal ao clicar fora do conteúdo
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}
