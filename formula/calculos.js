// calculos.js

// Função para recomendar a fórmula (mantida exatamente como você forneceu)
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

// Função para exibir erro (moderno e minimalista)
function mostrarErro(mensagem) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = mensagem;

  // Adiciona ao início da seção de resultado
  const resultSection = document.querySelector(
    'section[aria-labelledby="resultado"]'
  );
  if (resultSection) {
    resultSection.prepend(errorDiv);
    // Remove após 5 segundos
    setTimeout(() => errorDiv.remove(), 5000);
  }
}

// Função principal para calcular TMB e GET
function calcularTMB() {
  // Lê dados da URL
  const params = new URLSearchParams(window.location.search);

  // Coleta dados do formulário
  const formData = {
    sexo: params.get("sexo") || "",
    peso: parseFloat(params.get("peso")) || null,
    altura: parseInt(params.get("altura")) || null,
    idade: parseInt(params.get("idade")) || null,
    gordura: parseFloat(params.get("gordura")) || "",
    atividade: params.get("atividade") || "",
    biotipo: params.get("biotipo") || "",
    objetivo_composicao: params.get("objetivo_composicao") || "",
    objetivos: params.getAll("objetivos[]") || [],
  };

  // Combina objetivo_composicao e objetivos[] em um único array
  const objetivos = formData.objetivo_composicao
    ? [formData.objetivo_composicao, ...formData.objetivos]
    : formData.objetivos;

  // Elementos da página
  const formulaName = document.getElementById("formula-name");
  const tmbResult = document.getElementById("tmb-result");
  const getResult = document.getElementById("get-result");
  const formulaReason = document.getElementById("formula-reason");

  // Validação dos campos obrigatórios
  if (
    !formData.sexo ||
    !formData.peso ||
    !formData.altura ||
    !formData.idade ||
    !formData.atividade ||
    !formData.biotipo
  ) {
    mostrarErro(
      "Dados incompletos. Por favor, preencha todos os campos obrigatórios no formulário de triagem."
    );
    formulaName.textContent = "N/A";
    tmbResult.textContent = "N/A";
    getResult.textContent = "N/A";
    formulaReason.textContent = "Aguardando dados completos do formulário.";
    return;
  }

  // Determina a fórmula com base na recomendação
  const recomendacao = recomendarFormula(
    formData.biotipo,
    objetivos,
    formData.gordura
  );
  let formula;
  if (recomendacao.includes("Katch-McArdle")) {
    formula = "katch-mcardle";
  } else if (recomendacao.includes("Mifflin-St Jeor")) {
    formula = "mifflin-st-jeor";
  } else if (recomendacao.includes("Harris-Benedict")) {
    formula = "harris-benedict";
  } else {
    formula = "mifflin-st-jeor"; // Padrão
  }

  // Validação para Katch-McArdle
  if (formula === "katch-mcardle" && !formData.gordura) {
    mostrarErro(
      "A fórmula Katch-McArdle requer o percentual de gordura corporal. Usando Mifflin-St Jeor como alternativa."
    );
    formula = "mifflin-st-jeor";
  }

  let tmb;

  // Cálculo da TMB
  switch (formula) {
    case "harris-benedict":
      if (formData.sexo === "masculino") {
        tmb =
          88.362 +
          13.397 * formData.peso +
          4.799 * formData.altura -
          5.677 * formData.idade;
      } else {
        tmb =
          447.593 +
          9.247 * formData.peso +
          3.098 * formData.altura -
          4.33 * formData.idade;
      }
      break;

    case "mifflin-st-jeor":
      tmb = 10 * formData.peso + 6.25 * formData.altura - 5 * formData.idade;
      if (formData.sexo === "masculino") {
        tmb += 5;
      } else {
        tmb -= 161;
      }
      break;

    case "katch-mcardle":
      const massaMagra = formData.peso * (1 - formData.gordura / 100);
      tmb = 370 + 21.6 * massaMagra;
      break;

    case "oms":
      if (formData.sexo === "masculino") {
        if (formData.idade >= 18 && formData.idade <= 30)
          tmb = 15.3 * formData.peso + 679;
        else if (formData.idade <= 60) tmb = 11.6 * formData.peso + 879;
        else tmb = 11.9 * formData.peso + 700;
      } else {
        if (formData.idade >= 18 && formData.idade <= 30)
          tmb = 14.7 * formData.peso + 496;
        else if (formData.idade <= 60) tmb = 8.7 * formData.peso + 829;
        else tmb = 10.5 * formData.peso + 596;
      }
      break;

    case "owen":
      if (formData.sexo === "masculino") {
        tmb = 879 + 10.2 * formData.peso;
      } else {
        tmb = 795 + 7.18 * formData.peso;
      }
      break;

    case "henry":
      if (formData.sexo === "masculino") {
        if (formData.idade >= 18 && formData.idade <= 30)
          tmb = 14.7 * formData.peso + 678;
        else if (formData.idade <= 60) tmb = 13.0 * formData.peso + 747;
        else tmb = 13.5 * formData.peso + 514;
      } else {
        if (formData.idade >= 18 && formData.idade <= 30)
          tmb = 10.5 * formData.peso + 615;
        else if (formData.idade <= 60) tmb = 9.7 * formData.peso + 595;
        else tmb = 9.8 * formData.peso + 520;
      }
      break;

    default:
      mostrarErro("Fórmula inválida.");
      return;
  }

  // Fator de atividade para GET
  let fatorAtividade;
  switch (formData.atividade) {
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

  // Formata o nome da fórmula
  const formulaNome = formula
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Atualiza a página
  formulaName.textContent = formulaNome;
  tmbResult.textContent = tmb.toFixed(2);
  getResult.textContent = get.toFixed(2);
  formulaReason.textContent = recomendacao;
}

// Executa ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  calcularTMB();
});
