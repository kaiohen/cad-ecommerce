<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="e Commerce" />

  &#xa0;
</div>

<h1 align="center">e-Commerce</h1>

<p align="center">
  <a href="#descricao">Sobre</a> &#xa0; | &#xa0; 
  <a href="#referencias">Referências</a> &#xa0; | &#xa0;
  <a href="#tecnologias">Tecnologias</a> &#xa0; | &#xa0;
  <a href="#requisitos">Requisitos</a> &#xa0; | &#xa0;
  <a href="#explicacao">Explicação</a> &#xa0; | &#xa0;
  <a href="https://github.com/kaiohen" target="_blank">Criador</a>
</p>

<br>

<h2 id="descricao">Descrição</h2>
<p>
  Esta tela de cadastro foi desenvolvida para um e-commerce, proporcionando uma experiência de registro simples, intuitiva e eficiente. O design prioriza a usabilidade, utilizando a integração com a API <em>ViaCEP</em> para automatizar o preenchimento dos dados de endereço, agilizando o processo e minimizando erros.
</p>
<p>
  O formulário de cadastro inclui campos para <strong>nome</strong>, <strong>e-mail</strong>, <strong>CPF</strong>, <strong>senha</strong> e <strong>CEP</strong>. Ao inserir o CEP e clicar no botão de consulta, os dados de endereço são preenchidos automaticamente. Essa funcionalidade, garantida pela integração com a API ViaCEP, simplifica o preenchimento e melhora significativamente a experiência do usuário.
</p>
<p>
  Além disso, os campos de <strong>e-mail</strong>, <strong>CPF</strong> e <strong>CEP</strong> possuem validações implementadas com <em>JavaScript</em>. Essas verificações garantem que os dados sejam inseridos corretamente, evitando inconsistências e garantindo a integridade das informações cadastradas.
</p>

<h2 id="referencias">Referências</h2>
<p>Projetos usados como base para a criação:</p>

  - [Formulario de Cadastro de Endereço com consumo de API.](https://github.com/kaiohen/-form-CadEndereco)
  - [Validação de Email e CPF com JavaScript.](https://github.com/kaiohen/validacao?tab=readme-ov-file#top)

<h3>Sites utilizados:</h3>

  - [MDN Web Docs](https://developer.mozilla.org/pt-BR/)
  - [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
  - [W3Schools](https://www.w3schools.com))
  

  
  
<h2 id="tecnologias">Tecnologias</h2>
<p>Tecnologias utilizadas para a criação do projeto:</p>
<ul>
  <li><img src="https://img.shields.io/badge/Bootstrap-purple?logo=bootstrap&logoColor=white&style=for-the-badge" alt="Bootstrap"></li>
  <li><img src="https://img.shields.io/badge/CSS3-blue?style=for-the-badge&logo=CSS3" alt="CSS3"></li>
  <li><img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge" alt="JavaScript"></li>
  <li><img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=for-the-badge" alt="HTML5"></li>
</ul>

<h2 id="requisitos">Requisitos</h2>
<p>Requisitos para executar este projeto adequadamente:</p>
<ul>
  <li>Navegador web (recomendado Google Chrome)</li>
  <li>Editor de código (VS Code)</li>
  <li>Bootstrap 5.3</li>
  <li>JavaScript</li>
</ul>

<h2 id="explicacao">Explicação</h2>

~~~ JavaScript
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
~~~
- _const_ = declara uma variavel que o valor não pode ser mudado.
- _document.getElementById_ = Seleciona elemento especifico do HTML pelo ID.
- _trim()_ = remove espaços em brancos no inicio e final de uma string.
  <br>
<p>Essa função verifica os campos do formulário se estão preenchidos e valida os dados inseridos como cpf e email. Caso tenha algum erro, uma mensagem e exibida, e o envio do formulario é interrompido. </p>

~~~ JavaScript
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
~~~
- _/^[0-9]+$/_ = expressão regular apenas de números.
- _.test()_ = verifica se a string corresponde a expressão regular. 
- _.length_ = retorna o número de elemento de  uma array.
- _async_ = torna uma função assincrona.
- _await_ = pausa a execução do codigo até a promise seja resolvida.
- _fetch()_ = faz uma solicitação http para o url e retorna uma Promise.
- _Promise_ = determina que uma tarefa será concluida no futuro, mesmo se for com secesso ou erro.
- _.json()_ = transforma dados em um abjeto JavaScript utilizavel.

<p> Função valída o CEP, busca informações do endereço a partir do cep digitado na API ViaCep e preenche o modal.</p>

<br>
<a href="#top">Voltar ao topo</a>
