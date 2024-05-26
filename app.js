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
    const cep = document.querySelector('#cep').value;
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error('Erro na rede');
            }
            return resposta.json();
        })
        .then(json => {
            if (json.erro) {
                alert('CEP não encontrado!');
                return;
            }

            document.getElementById('Rua').value = json.logradouro || '';
            document.getElementById('Complemento').value = json.complemento || '';
            document.getElementById('Bairro').value = json.bairro || '';
            document.getElementById('Cidade').value = json.localidade || '';
            document.getElementById('UF').value = json.uf || '';
            document.getElementById('IBGE').value = json.ibge || '';
            document.getElementById('GIA').value = json.gia || '';
            document.getElementById('DDD').value = json.ddd || '';
            document.getElementById('siafi').value = json.siafi || '';
        })
        .catch(error => console.error('Erro:', error));
}
