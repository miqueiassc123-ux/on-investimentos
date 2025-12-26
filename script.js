// Link da sua planilha
const urlPlanilha = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTB7sm4v8PIispUaDI7eQfYbQqlMW0sf6qbEWzqrK5KA4G0WNRjQIS2TYP6UpohciNBtCi0VUbA-Y3q/pub?output=csv";

let imoveis = [];

// Função para limpar e converter números brasileiros/planilha para números JS
function formatarMoedaParaNumero(valor) {
    if (!valor) return 0;
    
    // Remove R$, espaços e qualquer coisa que não seja número, ponto ou vírgula
    let limpo = valor.toString().replace(/[R$\s]/g, '');

    // Se o número vier no formato 1.050.000,00 (padrão BR)
    if (limpo.includes(',') && limpo.includes('.')) {
        limpo = limpo.replace(/\./g, '').replace(',', '.');
    } 
    // Se vier apenas com vírgula (ex: 1050,50)
    else if (limpo.includes(',')) {
        limpo = limpo.replace(',', '.');
    }

    return parseFloat(limpo) || 0;
}

async function carregarDados() {
    try {
        const resposta = await fetch(`${urlPlanilha}&cachebuster=${new Date().getTime()}`);
        const csvText = await resposta.text();
        
        // Divide as linhas e remove o cabeçalho
        const linhas = csvText.split(/\r?\n/).map(linha => linha.split(','));
        
        imoveis = linhas.slice(1).map(linha => {
            if (linha.length < 9 || linha[0] === "") return null;

            return {
                nome: linha[0].trim(),
                cidade: linha[1].trim(),
                bairro: linha[2].trim(),
                preco: formatarMoedaParaNumero(linha[3]),
                tipo: linha[4].trim(),
                fase: linha[5].trim(),
                aluguel: formatarMoedaParaNumero(linha[6]),
                valorizacao: formatarMoedaParaNumero(linha[7]),
                m2: formatarMoedaParaNumero(linha[8])
            };
        }).filter(item => item !== null);

        console.log("Dados sincronizados com sucesso!");
    } catch (erro) {
        console.error("Erro ao carregar planilha:", erro);
    }
}

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
        divPos.innerHTML = "<p class='aviso'>Nenhum investimento encontrado.</p>";
        return;
    }

    lista.forEach(imovel => {
        const precoPorM2 = imovel.preco / imovel.m2;
        let badgeTexto = `TOP ${imovel.valorizacao}%`;
        
        if (imovel.tipo === "Chácara" && precoPorM2 < 200) {
            badgeTexto = "OPORTUNIDADE";
        }

        divPos.innerHTML += `
            <div class="resultado-item">
                <div class="score-badge">${badgeTexto}</div>
                <h3>${imovel.nome}</h3>
                <p><strong>📍 LOCAL:</strong> ${imovel.bairro} - ${imovel.cidade}</p>
                <p><strong>💰 INVESTIMENTO:</strong> R$ ${imovel.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p><strong>📏 METRAGEM:</strong> ${imovel.m2.toLocaleString('pt-BR')} m²</p>
                <p><strong>🏷️ PREÇO/M²:</strong> R$ ${precoPorM2.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p><strong>🔑 FASE:</strong> ${imovel.fase}</p>
                <p><strong>📈 VALORIZAÇÃO:</strong> ${imovel.valorizacao}% a.a.</p>
                ${imovel.aluguel > 0 ? `<p><strong>💵 ALUGUEL EST.:</strong> R$ ${imovel.aluguel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>` :