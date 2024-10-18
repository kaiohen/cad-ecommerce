// remove espaços em brancos e armazena os ids
function verificarCampos() {
    const nome = document.getElementById("nomeUser").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("Senha").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const data = document.getElementById("data").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const msg = document.getElementById("message");
    // verifica se algum campo está vazio
    if (!nome || !email || !senha || !cpf || !data || !cep) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }
    if (!validarCPF(cpf)) {
      msg.textContent = "Cpf é inválido!";
      msg.style.color = "red";
      return false;
    } else {
      msg.textContent = "";
    }
    return checarEmail();
  };
  document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault();
   
      // Chama a função verificarCampos
      if (verificarCampos()) {
        this.submit(); // Envia o formulario após a validação
         }
  });
  