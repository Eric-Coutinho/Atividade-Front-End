function jsPadrao() {
    let xhr = new XMLHttpRequest();
    // define the request
    xhr.open('GET', 'https://viacep.com.br/ws/01001000/json/');

    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        const DONE = 4; // readyState 4 means the request is done.
        const OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                console.log(xhr.responseText); // 'This is the output.'
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };
    xhr.send();
}

/**
 * para testar essa função usar descomentar essa linha no html
 *     <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>    
 */
function jqueryGet() {
    $.get('https://viacep.com.br/ws/01001000/json/', (data) => {
        console.log(data)
    })
}

function consultaCep() {
   const cep = document.querySelector('#cep').value 
   const retorno = document.querySelector('#retorno') 
   fetch(`https://viacep.com.br/ws/${cep}/json/`)
   .then(resposta => resposta.json())
//    .then(json => console.log(json))
   .then(json => {
     retorno.innerText = JSON.stringify(json)
   })
   .catch(error => console.log(error))
}