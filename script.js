const urlPlanilha = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTB7sm4v8PIispUaDI7eQfYbQqlMW0sf6qbEWzqrK5KA4G0WNRjQIS2TYP6UpohciNBtCi0VUbA-Y3q/pub?output=csv";

let imoveis = [];

function formatarParaNumero(valor) {
    if (!valor) return 0;
    // Remove aspas e espaços, depois trata o formato brasileiro
    let limpo = valor.toString().replace(/["\s]/g, '');
    if (limpo.includes(',') && limpo.includes('.')) {
        limpo = limpo.replace(/\./g, '').replace(',', '.');
    } else if (limpo.includes(',')) {
        limpo = limpo.replace(',', '.');
    }
    return parseFloat(limpo) || 0;
}

async function carregarDados() {
    try {
        const resposta = await fetch(`${urlPlanilha}&cachebuster=${new Date().getTime()}`);
        const csvText = await resposta.text();
        const linhas = csvText.split(/\r?\n/);
        
        imoveis = linhas.slice(1).map(linha => {
            const col = linha.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (col.length < 9 || !col[0]) return null;

            return {
                nome: col[0].replace(/"/g, '').trim(),
                cidade: col[1].trim(),
                bairro: col[2].trim(),
                preco: formatarParaNumero(col[3]),
                tipo: col[4].trim(),
                fase: col[5].trim(),
                aluguel: formatarParaNumero(col[6]),
                valorizacao: formatarParaNumero(col[7]),
                m2: formatarParaNumero(col[8])
            };
        }).filter(item => item !== null);

        exibirResultados(imoveis);
    } catch (e) { console.error(e); }
}

carregarDados();

document.getElementById('buscar').addEventListener('click', () => {
    const vMax = document.getElementById('valor').value;
    const cid = document.getElementById('cidade').value;
    const res = imoveis.filter(i => (vMax === "" || i.preco <= vMax) && (cid === "" || i.cidade === cid));
    exibirResultados(res);
});

function exibirResultados(lista) {
    const div = document.getElementById('resultados');
    div.innerHTML = lista.length ? "" : "<p class='aviso'>Nada encontrado.</p>";
    lista.forEach(i => {
        const pM2 = i.preco / i.m2;
        div.innerHTML += `
            <div class="resultado-item">
                <div class="score-badge">TOP ${i.valorizacao}%</div>
                <h3>${i.nome}</h3>
                <p>📍 ${i.bairro} - ${i.cidade}</p>
                <p>💰 R$ ${i.preco.toLocaleString('pt-BR')}</p>
                <p>📏 ${i.m2.toLocaleString('pt-BR')} m²</p>
                <p>🏷️ R$ ${pM2.toLocaleString('pt-BR', {maximumFractionDigits:2})}/m²</p>
            </div>`;
    });
}