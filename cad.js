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
   
  const eNumero = (numero) => /^[0-9]+$/.test(numero);
  const cepValido = (cep) => cep.length == 8 && eNumero(cep);
   
  const preencherFormulario = (endereco) => {
    document.getElementById("logradouro").innerText = endereco.logradouro;
    document.getElementById("bairro").innerText = endereco.bairro;
    document.getElementById("localidade").innerText = endereco.localidade;
    document.getElementById("uf").innerText = endereco.uf;
  };
  // Função assíncrona que pesquisa um CEP na API e exibe os dados no formulário
  const pesquisarCep = async () => {
    const cep = document.getElementById("cep");
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;
    if (cepValido(cep.value)) {
      const dados = await fetch(url);
      // Busca dados na API
      const addres = await dados.json();
      //  Transforma a resposta da API em um objeto JavaScript utilizável
   
      // Verifica se há um erro nos dados
      if (addres.hasOwnProperty("erro")) {
        alert("Cep não encontrado");
      } else {
        preencherFormulario(addres);
        // Exibe as informações no modal
        const cepModal = new bootstrap.Modal(document.getElementById("cepModal"));
        cepModal.show();
      }
    } else {
      alert("CEP incorreto!");
    }
  };
  //adiciona escutador para executar consumo de API da ViaCep
  document.getElementById("consultarCep").addEventListener("click", pesquisarCep);
  // VALIDAÇÃO DE CPF
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ""); // remove caracteres não numéricos
    // verificar se o valor informado contem 11 digitos e se todos são digitos iguais
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    let soma = 0;
    let resto;
    // validação do primeiro digito verificador
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }
    soma = 0;
    // validar 11 elementos do CPF - 2º digito verificador
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
   
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
    return true;
  }
  // Função para validar o e-mail
  function checarEmail() {
    const emailValue = document.forms[0].email.value;
    if (emailValue === "" || !emailValue.includes("@") || !emailValue.includes(".")) {
      alert("Por favor, informe um email válido");
      return false;
    } else {
      return true;
    }
  }