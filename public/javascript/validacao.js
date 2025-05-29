document
  .getElementById("form-triagem")
  .addEventListener("submit", function (e) {
    // Remove mensagens de erro anteriores
    document.querySelectorAll(".error-message").forEach((msg) => msg.remove());

    let isValid = true;

    // Função para mostrar mensagem de erro
    function showError(inputId, message) {
      const input = document.getElementById(inputId);
      const error = document.createElement("p");
      error.className = "error-message";
      error.style.color = "red";
      error.style.fontSize = "0.9em";
      error.textContent = message;
      input.parentNode.appendChild(error);
      input.focus();
      isValid = false;
    }

    // Valida Nome
    const nome = document.getElementById("nome").value.trim();
    if (nome === "") {
      showError("nome", "Por favor, insira seu nome.");
    } else if (!/^[\p{L}\s]+$/u.test(nome)) {
      showError("nome", "O nome deve conter apenas letras e espaços.");
    }

    // Valida Idade
    const idade = parseInt(document.getElementById("idade").value);
    if (isNaN(idade) || idade < 1) {
      showError("idade", "Por favor, insira uma idade válida (mínimo 1).");
    } else if (idade > 120) {
      showError("idade", "Por favor, insira uma idade realista (máximo 120).");
    }

    // Valida Peso
    const peso = parseFloat(document.getElementById("peso").value);
    if (isNaN(peso) || peso <= 0) {
      showError("peso", "Por favor, insira um peso válido (maior que 0).");
    } else if (peso > 300) {
      showError("peso", "Por favor, insira um peso realista (máximo 300 kg).");
    }

    // Valida Altura
    const altura = parseInt(document.getElementById("altura").value);
    if (isNaN(altura) || altura < 50) {
      showError(
        "altura",
        "Por favor, insira uma altura válida (mínimo 50 cm)."
      );
    } else if (altura > 250) {
      showError(
        "altura",
        "Por favor, insira uma altura realista (máximo 250 cm)."
      );
    }

    // Valida Sexo
    const sexo = document.getElementById("sexo").value;
    if (!sexo) {
      showError("sexo", "Por favor, selecione seu sexo.");
    }

    // Valida Atividade
    const atividade = document.getElementById("atividade").value;
    if (!atividade) {
      showError("atividade", "Por favor, selecione seu nível de atividade.");
    }

    // Valida Biotipo
    const biotipo = document.querySelector('input[name="biotipo"]:checked');
    if (!biotipo) {
      showError("biotipo-container", "Por favor, selecione um biotipo.");
    }

    // Valida Objetivo de Composição
    const objetivo = document.querySelector(
      'input[name="objetivo_composicao"]:checked'
    );
    if (!objetivo) {
      showError(
        "obj-manter",
        "Por favor, selecione um objetivo de composição corporal."
      );
    }

    // Valida Percentual de Gordura (opcional, mas se preenchido, deve ser válido)
    const gordura = document.getElementById("gordura").value;
    if (gordura !== "") {
      const gorduraNum = parseFloat(gordura);
      if (isNaN(gorduraNum) || gorduraNum < 0 || gorduraNum > 100) {
        showError(
          "gordura",
          "Por favor, insira um percentual de gordura válido (0 a 100)."
        );
      }
    }

    // Se inválido, impede o envio
    if (!isValid) {
      e.preventDefault();
    }
  });
