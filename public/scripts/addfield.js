// Pocurar Botão
document.querySelector("#add-time")

// Quando clicar no botão
.addEventListener('click', clonefield)


//Executar uma ação
function clonefield() {
    //console.log("Cheguei aqui !!")

    // * Duplicar os campos - qual item da pagina?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)

    // limpar os próximos campos duplicados
    const fields = newFieldContainer.querySelectorAll('input')

    /* repetição de dados
    fields[0].value = ""
    fields[1].value = "" */

    // Criar function para o evento - para cada campo - Limpar
    fields.forEach(function(fieldDoMomento) {
        // Pegar o argumento da função e limpa
        fieldDoMomento.value = ""
    })

    // * Colocar na página - onde?
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}