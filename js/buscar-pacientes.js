// Selecionar botão Buscar pacientes
var botaoBuscarPacientes = document.querySelector("#buscar-paciente");

// Adicionar evento ao clicar no botão
botaoBuscarPacientes.addEventListener('click', function () {
    console.log("Buscando pacientes...");

    // instanciar objeto para fazer requisição HTTP
    var xhr = new XMLHttpRequest();

    // Montar a requisição - Método HTTP e URL
    xhr.open("GET", "http://api-pacientes.herokuapp.com/pacientes"); 

    // Adiciobar um escutador para executar uma função quando a resposta da requisição estiver carregada (load)
    xhr.addEventListener("load", function () {
        // Selecionar Elemento HTML que mostra mensagem de erro
        var mensagemErro = document.querySelector("#erro-ajax");

        // Verifica se a resposta da requisição foi OK (200)
        if (xhr.status == 200) {
            //
            mensagemErro.classList.add("invisivel");
            // Pegar a resposta que está no formato texto JSON
            var resposta = xhr.responseText;

            // Converter o texto JSON em um array
            var pacientes = JSON.parse(resposta);
            
            // adicionar pacientes na tabela
            pacientes.forEach(function (paciente) {
                adicionaPacienteNaTabela(paciente);
            });
        } else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            
            mensagemErro.classList.remove("invisivel");
            mensagemErro.classList.add("mensagens-erro-ajax-style")
        }
       
    });

    // Enviar a requisição
    xhr.send(); 
});