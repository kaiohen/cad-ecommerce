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
  