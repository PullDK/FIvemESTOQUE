// Função para verificar se os dados já estão armazenados localmente
function dadosArmazenadosLocalmente() {
    return localStorage.getItem("dados") !== null;
}

// Função para criar e armazenar os dados localmente
function criarDadosLocalmente() {
    const dados = {
        "Familia": "MELIODAS",
        "Nome": "Digite seu Nome",
        "Passaporte": "Digite seu passaporte",
        "MINHA META": {
            "ALUMINIO": "0/700",
            "COBRE": "0/215",
            "PLASTICOS": "0/910",
            "TITANIOS": "0/60",
            "VIDROS": "0/1400"
        },
        "Recursos Colocados": {
            "ALUMINIO": 0,
            "COBRE": 0,
            "PLASTICOS": 0,
            "TITANIOS": 0,
            "VIDROS": 0
        }
    };
    localStorage.setItem("dados", JSON.stringify(dados));
}

// Função para ler os dados armazenados localmente
function lerDadosLocalmente() {
    return JSON.parse(localStorage.getItem("dados"));
}

// Função para atualizar os dados armazenados localmente
function atualizarDadosLocalmente(dados) {
    localStorage.setItem("dados", JSON.stringify(dados));
}

// Função para exibir os dados formatados
function exibirDados() {
    const dados = lerDadosLocalmente();
    const dadosContainer = document.getElementById('dadosContainer');
    dadosContainer.innerHTML = ''; // Limpa o conteúdo anterior

    const dadosBox = document.createElement('div');
    dadosBox.classList.add('dadosBox');

    const dadosText = document.createElement('pre');
    dadosText.textContent = `
Familia: ${dados["Familia"]}
Nome: ${dados["Nome"]}
Passaporte: ${dados["Passaporte"]}

MINHA META:
${Object.entries(dados["MINHA META"]).map(([item, meta]) => `  ${item}: ${meta}`).join('\n')}

Recursos Colocados:
${Object.entries(dados["Recursos Colocados"]).map(([item, quantidade]) => `  ${item}: ${quantidade}`).join('\n')}
    `;

    // Adicionando evento de clique para copiar texto em dispositivos móveis
    dadosText.addEventListener('click', () => {
        copiarTextoParaAreaTransferencia(dadosText.textContent);
        alert('Dados copiados para a área de transferência!');
    });

    dadosBox.appendChild(dadosText);
    dadosContainer.appendChild(dadosBox);
}

// Função para copiar o texto para a área de transferência
function copiarTextoParaAreaTransferencia(texto) {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}


/// Função para perguntar a quantidade de cada item e atualizar os dados
function perguntarEAtualizar() {
    let dados = lerDadosLocalmente();

    for (const item in dados["MINHA META"]) {
        let quantidade = null;
        while (quantidade === null) {
            let quantidadeInput = prompt(`Quantidade de ${item}: `);
            if (quantidadeInput === null) {
                console.log("Ação cancelada.");
                return; // Cancela a ação se o usuário clicar em "Cancelar"
            }
            quantidade = parseInt(quantidadeInput);
            if (isNaN(quantidade)) {
                console.log("Por favor, insira um número inteiro.");
                quantidade = null;
            }
        }

        dados["Recursos Colocados"][item] = quantidade;
        const metaAtual = dados["MINHA META"][item].split('/');
        metaAtual[0] = (parseInt(metaAtual[0]) + quantidade).toString();
        dados["MINHA META"][item] = metaAtual.join('/');
    }

    atualizarDadosLocalmente(dados);
    console.log("Recursos atualizados com sucesso.");
    exibirDados();
}

// Função para resetar os dados para zero
function resetarDados() {
    let dados = lerDadosLocalmente();
    for (const item in dados["Recursos Colocados"]) {
        dados["Recursos Colocados"][item] = 0;
        const metaAtual = dados["MINHA META"][item].split('/');
        metaAtual[0] = '0';
        dados["MINHA META"][item] = metaAtual.join('/');
    }
    atualizarDadosLocalmente(dados);
    console.log("Os dados foram resetados para zero.");
    exibirDados();
}

// Função para editar a meta
function editarMeta() {
    let dados = lerDadosLocalmente();
    let index = 1;

    console.log("Escolha o número do item que deseja editar (1 a 5):");
    for (const item in dados["MINHA META"]) {
        console.log(`${index} - ${item}`);
        index++;
    }

    let escolha = null;
    while (escolha === null) {
        let escolhaInput = prompt("Escolha o número do item que deseja editar (1 a 5): ");
        if (escolhaInput === null) {
            console.log("Ação cancelada.");
            return; // Cancela a ação se o usuário clicar em "Cancelar"
        }
        escolha = parseInt(escolhaInput);
        if (isNaN(escolha) || escolha < 1 || escolha >= index) {
            console.log("Escolha inválida. Por favor, escolha um número de 1 a " + (index - 1) + ".");
            escolha = null;
        }
    }

    const itemEditar = Object.keys(dados["MINHA META"])[escolha - 1];
    const metaAtual = dados["MINHA META"][itemEditar].split('/');
    const primeiroValor = metaAtual[0];
    const novaMeta = prompt(`Novo valor para ${itemEditar} (atual: ${primeiroValor}): `);

    if (novaMeta === null) {
        console.log("Ação cancelada.");
        return; // Cancela a ação se o usuário clicar em "Cancelar"
    }

    const novoPrimeiroValor = parseInt(novaMeta);
    if (isNaN(novoPrimeiroValor)) {
        console.log("Valor inválido. A meta não foi alterada.");
        return;
    }

    dados["MINHA META"][itemEditar] = `${novoPrimeiroValor}/${metaAtual[1]}`;
    atualizarDadosLocalmente(dados);
    console.log("A meta foi atualizada com sucesso.");
    exibirDados();
}


/// Função para trocar o nome e o número do passaporte
function trocarNomePassaporte() {
    const dados = lerDadosLocalmente();
    
    const novoNome = prompt("Digite o novo nome:");
    if (novoNome === null) {
        console.log("Ação cancelada.");
        return; // Cancela a ação se o usuário clicar em "Cancelar"
    }
    
    const novoPassaporte = prompt("Digite o novo número do passaporte:");
    if (novoPassaporte === null) {
        console.log("Ação cancelada.");
        return; // Cancela a ação se o usuário clicar em "Cancelar"
    }
    
    if (novoNome && novoPassaporte) {
        dados["Nome"] = novoNome;
        dados["Passaporte"] = novoPassaporte;
        
        atualizarDadosLocalmente(dados);
        console.log("Nome e número do passaporte atualizados com sucesso.");
        exibirDados();
    } else {
        console.log("Nome ou número do passaporte inválidos.");
    }
}

// Verificar se os dados já estão armazenados localmente e criar se não estiverem
if (!dadosArmazenadosLocalmente()) {
    criarDadosLocalmente();
}

// Exibir os dados ao carregar a página
exibirDados();
