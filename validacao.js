document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-cadastro");

  const nomeInput = document.getElementById("nome");
  const cpfInput = document.getElementById("cpf");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const confirmSenhaInput = document.getElementById("confirmasenha");
  const checkbox = document.getElementById("checkbox");

  const toggleSenha = document.getElementById("toggleSenha");
  const toggleConfirmSenha = document.getElementById("toggleConfirmSenha");

  const erroNome = nomeInput.parentNode.querySelector(".erro");
  const erroCpf = cpfInput.parentNode.querySelector(".erro");
  const erroEmail = emailInput.parentNode.querySelector(".erro");
  const erroSenha = senhaInput.parentNode.nextElementSibling.nextElementSibling;
  const erroConfirmSenha = confirmSenhaInput.parentNode.nextElementSibling.nextElementSibling;
  const erroCheckbox = checkbox.parentNode.parentNode.querySelector(".erro");

  const avisoNome = nomeInput.parentNode.querySelector(".aviso");

  const ajudaConfirmSenha = confirmSenhaInput.parentNode.nextElementSibling;
  ajudaConfirmSenha.style.display = "none";

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  let tentouEnviar = false;

  function showError(input, erroDiv, message) {
    erroDiv.textContent = message;
    erroDiv.style.display = "block";
    if (input.tagName === "INPUT") input.style.borderColor = "red";
  }

  function hideError(input, erroDiv) {
    erroDiv.style.display = "none";
    if (input.tagName === "INPUT") input.style.borderColor = "green";
  }

  nomeInput.addEventListener("input", function () {
    let value = nomeInput.value;
    value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const temSimbolo = /[^A-Za-z\s]/.test(value);
    value = value.replace(/[^A-Za-z\s]/g, "");
    const exceptions = ["de", "da", "do", "das", "dos", "e"];
    value = value
      .split(" ")
      .map(p => (exceptions.includes(p.toLowerCase()) ? p.toLowerCase() : p.charAt(0).toUpperCase() + p.slice(1)))
      .join(" ");
    nomeInput.value = value;
    avisoNome.style.display = temSimbolo ? "block" : "none";
    if (tentouEnviar) {
      if (value.trim().length < 5) showError(nomeInput, erroNome, "O nome deve ter pelo menos 5 caracteres e sem símbolos.");
      else hideError(nomeInput, erroNome);
    }
  });

  cpfInput.addEventListener("input", function () {
    let value = cpfInput.value.replace(/\D/g, "").substring(0, 11);
    if (value.length > 9)
      value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, "$1.$2.$3-$4");
    else if (value.length > 6)
      value = value.replace(/^(\d{3})(\d{3})(\d{1,3})$/, "$1.$2.$3");
    else if (value.length > 3)
      value = value.replace(/^(\d{3})(\d{1,3})$/, "$1.$2");
    cpfInput.value = value;
    if (tentouEnviar) {
      if (cpfRegex.test(value)) hideError(cpfInput, erroCpf);
      else showError(cpfInput, erroCpf, "Digite um CPF válido (ex: 123.456.789-10).");
    }
  });

  toggleSenha.addEventListener("click", function () {
    senhaInput.type = senhaInput.type === "password" ? "text" : "password";
    toggleSenha.innerHTML = senhaInput.type === "password" ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
  });

  toggleConfirmSenha.addEventListener("click", function () {
    confirmSenhaInput.type = confirmSenhaInput.type === "password" ? "text" : "password";
    toggleConfirmSenha.innerHTML = confirmSenhaInput.type === "password" ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
  });

  senhaInput.addEventListener("input", function () {
    if (senhaInput.value.length > 0) ajudaConfirmSenha.style.display = "block";
    else ajudaConfirmSenha.style.display = "none";
    if (!tentouEnviar) return;
    if (senhaInput.value.length < 6) showError(senhaInput, erroSenha, "A senha deve ter pelo menos 6 caracteres.");
    else hideError(senhaInput, erroSenha);
    if (confirmSenhaInput.value && senhaInput.value !== confirmSenhaInput.value) showError(confirmSenhaInput, erroConfirmSenha, "As senhas não coincidem.");
    else if (confirmSenhaInput.value === senhaInput.value && confirmSenhaInput.value.length > 0) hideError(confirmSenhaInput, erroConfirmSenha);
  });

  confirmSenhaInput.addEventListener("input", function () {
    if (!tentouEnviar) return;
    if (confirmSenhaInput.value !== senhaInput.value) showError(confirmSenhaInput, erroConfirmSenha, "As senhas não coincidem.");
    else hideError(confirmSenhaInput, erroConfirmSenha);
  });

  emailInput.addEventListener("input", function () {
    if (!tentouEnviar) return;
    if (!emailRegex.test(emailInput.value)) showError(emailInput, erroEmail, "Digite um email válido no formato nome@dominio.com.");
    else hideError(emailInput, erroEmail);
  });

  checkbox.addEventListener("change", function () {
    if (!tentouEnviar) return;
    if (checkbox.checked) hideError(checkbox, erroCheckbox);
  });

  form.addEventListener("submit", function (event) {
    tentouEnviar = true;
    let valido = true;
    if (nomeInput.value.trim().length < 5) {
      showError(nomeInput, erroNome, "O nome deve ter pelo menos 5 caracteres e sem símbolos.");
      valido = false;
    }
    if (!cpfRegex.test(cpfInput.value)) {
      showError(cpfInput, erroCpf, "Digite um CPF válido (ex: 123.456.789-10).");
      valido = false;
    }
    if (!emailRegex.test(emailInput.value)) {
      showError(emailInput, erroEmail, "Digite um email válido no formato nome@dominio.com.");
      valido = false;
    }
    if (senhaInput.value.length < 6) {
      showError(senhaInput, erroSenha, "A senha deve ter pelo menos 6 caracteres.");
      valido = false;
    }
    if (senhaInput.value !== confirmSenhaInput.value) {
      showError(confirmSenhaInput, erroConfirmSenha, "As senhas não coincidem.");
      valido = false;
    }
    if (!checkbox.checked) {
      showError(checkbox, erroCheckbox, "Você precisa aceitar os Termos e Condições.");
      valido = false;
    }
    if (!valido) event.preventDefault();
  });
});
