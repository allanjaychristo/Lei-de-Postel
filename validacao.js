document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-cadastro");
    const cpfInput = document.getElementById("cpf");
    const checkbox = document.getElementById("checkbox");

    const toggleSenha = document.getElementById("toggleSenha");
    const senhaInput = document.getElementById("senha");

    const toggleConfirmSenha = document.getElementById("toggleConfirmSenha");
    const confirmSenhaInput = document.getElementById("confirmasenha");

    const emailInput = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nomeInput = document.getElementById("nome");

    nomeInput.addEventListener("input", function () {
    let value = nomeInput.value.toLowerCase();
    const exceptions = ["de", "da", "do", "das", "dos", "e"];

    value = value.split(" ").map(function (palavra) {
        if (exceptions.includes(palavra)) {
            return palavra;
        }
        return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    }).join(" ");

    nomeInput.value = value;
});

    cpfInput.addEventListener("input", function () {
        let value = cpfInput.value;
        value = value.replace(/\D/g, "");
        value = value.substring(0, 11);

        if (value.length > 9) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, "$1.$2.$3-$4");
        } else if (value.length > 6) {
            value = value.replace(/^(\d{3})(\d{3})(\d{1,3})$/, "$1.$2.$3");
        } else if (value.length > 3) {
            value = value.replace(/^(\d{3})(\d{1,3})$/, "$1.$2");
        }

        cpfInput.value = value;
    });

    toggleSenha.addEventListener("click", function () {
        if (senhaInput.type === "password") {
            senhaInput.type = "text";
            toggleSenha.innerHTML = '<i class="bi bi-eye-slash"></i>';
        } else {
            senhaInput.type = "password";
            toggleSenha.innerHTML = '<i class="bi bi-eye"></i>';
        }
    });

    toggleConfirmSenha.addEventListener("click", function () {
        if (confirmSenhaInput.type === "password") {
            confirmSenhaInput.type = "text";
            toggleConfirmSenha.innerHTML = '<i class="bi bi-eye-slash"></i>';
        } else {
            confirmSenhaInput.type = "password";
            toggleConfirmSenha.innerHTML = '<i class="bi bi-eye"></i>';
        }
    });

    form.addEventListener("submit", function (event) {
        const nome = nomeInput.value.trim();
        const senha = senhaInput.value;
        const confirmasenha = confirmSenhaInput.value;
        const email = emailInput.value;

        if (nome.length < 5) {
            alert("O nome deve ter pelo menos 5 caracteres.");
            event.preventDefault();
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Digite um email válido.");
            event.preventDefault();
            return;
        }

        if (senha.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            event.preventDefault();
            return;
        }

        if (senha !== confirmasenha) {
            alert("As senhas não coincidem.");
            event.preventDefault();
            return;
        }

        if (!checkbox.checked) {
            alert("Você precisa aceitar os Termos e Condições para prosseguir.");
            event.preventDefault();
            return;
        }
    });
});
