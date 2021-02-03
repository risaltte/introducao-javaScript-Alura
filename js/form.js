//selecionar o botão do formulário
var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(event) {
    // previne o comportamento default do objeto, ou seja cancela 
    // o comportamento que os elementos geralmente tem na página
    event.preventDefault();
    
    // seleciona o formulário (elemento HTML form com id form-adiciona)
    var form = document.querySelector("#form-adiciona");

    // obter paciente com dados preechidos no formulário
    paciente = obtemPacienteDoFormulario(form);   

    // validação dos dados do formulário
    var erros = validaPaciente(paciente);
    if (erros.length > 0)  {
        exibeMensagensDeErro(erros);
        return
    }

    // adicionar paciente na tabela
    adicionaPacienteNaTabela(paciente);

    // limpar os campos do formulário após inserir um novo paciente
    form.reset();

    // limpar as mensagens de erro após inserir um novo paciente
    mensagensDeErro = document.querySelector("#mensagens-erro");
    mensagensDeErro.innerHTML = "";

    // remover classe para estilizar mensagens de erro
    mensagensDeErro.classList.remove("mensagens-erro-style");    
});

function adicionaPacienteNaTabela(paciente) {
    // montar elemento tr (table row) com os dados do paciente
    pacienteTr = montarTr(paciente);

    // selecionar a table body (tbody)
    var pacientesTableBody = document.querySelector("#tabela-pacientes");

    // adicionar a linha (tr) na table body (tbody)
    pacientesTableBody.appendChild(pacienteTr);
}

function obtemPacienteDoFormulario(form) {
    // podemos acessar os valores do formulário usando o atributo name dos inputs
    paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    };

    return paciente;
}

function montarTr(paciente) {
    // cria o elemento HTML tr (linha de uma tabela)
    var pacienteTr = document.createElement("tr");

    // adicionar classe paciente ao elemento tr
    pacienteTr.classList.add("paciente");

    // criar elemetos HTML td (campos de uma linha da tabela - table data)
    // adicionaos os td's (filhos) ao tr (pai)
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "infor-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;
    
    return td;
}

function validaPaciente(paciente) {
    var erros = [];

    if (paciente.nome.length == 0) {
        erros.push("O campo nome deve ser preenchido.");
    }

    if (!validaPeso(paciente.peso)) {
        erros.push("O peso é inválido!");
    } 

    if (!validaAltura(paciente.altura)) {
        erros.push("A altura é inválida!");
    }

    if (paciente.peso.length == 0) {
        erros.push("O campo peso deve ser preenchido.");
    }

    if (paciente.altura.length == 0) {
        erros.push("O campo altura deve ser preenchido.");
    }

    if (paciente.gordura.length == 0) {
        erros.push("O campo gordura deve ser preenchido.");
    }

    return erros;
}

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");

    //limpar mensagens de erros anteriores
    ul.innerHTML = "";
    
    // adicionar classe para estilizar mensagens de erro
    ul.classList.add("mensagens-erro-style");

    // iteração usando o foreach do JS
    erros.forEach(function (erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}