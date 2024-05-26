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
    if (!cep)
        return;

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

            const currentAddress = {
                logradouro: json.logradouro,
                complemento: json.complemento,
                bairro: json.bairro,
                localidade: json.localidade,
                uf: json.uf,
                ibge: json.ibge,
                gia: json.gia,
                ddd: json.ddd,
                siafi: json.siafi
            };
            localStorage.setItem('currentAddress', JSON.stringify(currentAddress));
        })
        .catch(error => console.error('Erro:', error));
}

function addEndereco() {
    const currentAddress = JSON.parse(localStorage.getItem('currentAddress'));

    if (!currentAddress) {
        alert('Você precisa consultar um CEP primeiro.');
        return;
    }

    let addresses = JSON.parse(localStorage.getItem('listAddresses')) || [];

    addresses.push(currentAddress);
    console.log(addresses);

    localStorage.setItem('listAddresses', JSON.stringify(addresses));

    alert('Endereço adicionado com sucesso.');
    localStorage.removeItem('currentAddress');
    location.reload();
}

function loadAddresses() {
    let addresses = JSON.parse(localStorage.getItem('listAddresses')) || [];

    let tableBody = document.querySelector('#table tbody');
    tableBody.innerHTML = '';

    addresses.forEach(address => {
        let row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${address.logradouro}</td>
            <td>${address.localidade}</td>
            <td>${address.gia}</td>
            <td>${address.complemento}</td>
            <td>${address.uf}</td>
            <td>${address.ddd}</td>
            <td>${address.bairro}</td>
            <td>${address.ibge}</td>
            <td>${address.siafi}</td>
        `;

        tableBody.appendChild(row);
    });
}

loadAddresses();