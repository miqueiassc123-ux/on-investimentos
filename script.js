// Link da sua planilha publicado como CSV
const urlPlanilha = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTB7sm4v8PIispUaDI7eQfYbQqlMW0sf6qbEWzqrK5KA4G0WNRjQIS2TYP6UpohciNBtCi0VUbA-Y3q/pub?output=csv";

let imoveis = [];

// Função que busca os dados da planilha automaticamente
async function carregarDados() {
    try {
        // Adicionamos um número aleatório ao final para evitar que o navegador use dados antigos (cache)
        const resposta = await fetch(`${urlPlanilha}&cachebuster=${new Date().getTime()}`);
        const csvText = await resposta.text();
        
        // Converte o texto do CSV em uma lista de objetos que o JS entende
        const linhas = csvText.split('\n').map(linha => linha.split(','));
        const cabecalho = linhas[0];
        
        imoveis = linhas.slice(1).map(linha => {
            if (linha.length < 9) return null;
            return {
                nome: linha[0]?.trim(),
                cidade: linha[1]?.trim(),
                bairro: linha[2]?.trim(),
                preco: parseFloat(linha[3]),
                tipo: linha[4]?.trim(),
                fase: linha[5]?.trim(),
                aluguel: parseFloat(linha[6]) || 0,
                valorizacao: parseFloat(linha[7]),
                m2: parseFloat(linha[8])
            };
        }).filter(item => item !== null && !isNaN(item.preco));

        console.log("Banco de dados sincronizado com o Google Sheets!");
    } catch (erro) {
        console.error("Erro ao conectar com a planilha:", erro);
        document.getElementById('resultados').innerHTML = "<p class='aviso'>Erro ao carregar dados. Verifique sua conexão.</p>";
    }
}

// Inicia a carga de dados ao abrir o site
carregarDados();

document.getElementById('buscar').addEventListener('click', function() {
    const valorMax = document.getElementById('valor').value;
    const cidadeSel = document.getElementById('cidade').value;
    const tipoSel = document.getElementById('tipo').value;
    const metragemMin = document.getElementById('metragem').value;
    const faseSel = document.getElementById('fase').value;

    const resultados = imoveis.filter(imovel => {
        return (valorMax === "" || imovel.preco <= valorMax) &&
               (cidadeSel === "" || imovel.cidade === cidadeSel) &&
               (tipoSel === "" || imovel.tipo === tipoSel) &&
               (metragemMin === "" || imovel.m2 >= metragemMin) &&
               (faseSel === "" || imovel.fase === faseSel);
    });

    exibirResultados(resultados);
});

function exibirResultados(lista) {
    const divPos = document.getElementById('resultados');
    divPos.innerHTML = "";

    if (lista.length === 0) {
        divPos.innerHTML = "<p class='aviso'>Nenhum investimento encontrado com esses critérios.</p>";
        return;
    }

    lista.forEach(imovel => {
        const precoPorM2 = imovel.preco / imovel.m2;
        
        let badgeTexto = `TOP ${imovel.valorizacao}%`;
        if (imovel.tipo === "Chácara" && precoPorM2 < 100) {
            badgeTexto = "OPORTUNIDADE";
        }

        divPos.innerHTML += `
            <div class="resultado-item">
                <div class="score-badge">${badgeTexto}</div>
                <h3>${imovel.nome}</h3>
                <p><strong>📍 LOCAL:</strong> ${imovel.bairro} - ${imovel.cidade}</p>
                <p><strong>💰 INVESTIMENTO:</strong> R$ ${imovel.preco.toLocaleString('pt-BR')}</p>
                <p><strong>📏 METRAGEM:</strong> ${imovel.m2.toLocaleString('pt-BR')} m²</p>
                <p><strong>🏷️ PREÇO/M²:</strong> R$ ${precoPorM2.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <p><strong>🔑 FASE:</strong> ${imovel.fase}</p>
                <p><strong>📈 VALORIZAÇÃO:</strong> ${imovel.valorizacao}% a.a.</p>
                ${imovel.aluguel > 0 ? `<p><strong>💵 ALUGUEL EST.:</strong> R$ ${imovel.aluguel.toLocaleString('pt-BR')}</p>` : ''}
            </div>
        `;
    });
}