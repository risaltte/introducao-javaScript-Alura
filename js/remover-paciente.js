// Selecionar tabela de pacientes
var tabela = document.querySelector("#tabela-pacientes");

// adicionar evento para ouvir duplo click na tabela
tabela.addEventListener("dblclick", function (event) {
    // adicionar a classe fadeOut no pai do elemento que teve duplo click
    event.target.parentNode.classList.add("fadeOut");

    // executar o conteudo da função anônima depois de aguardar 500ms (0.5s)
    setTimeout(function () {
        // remover pai do elemento que teve duplo click
        event.target.parentNode.remove();
    }, 500);
    
});

