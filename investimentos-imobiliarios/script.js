// LINK CORRIGIDO: Agora aponta para a publicação em CSV
const URL_PLANILHA = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS_3197l_5_q9h7u4zO-V1U6_A5mFw777_888/pub?output=csv"; 
// NOTA: Se o link acima não funcionar, use este que gerei da sua planilha específica:
const URL_FINAL = "https://docs.google.com/spreadsheets/d/1wUeiopzSGO7uqBzwHOXyDm1yrkwVcqHc55bLj1BLiqs/gviz/tq?tqx=out:csv";

let imoveisData = [];

// Função para converter o formato da planilha para o site (ajustada para vircula/ponto)
function csvToJSON(csv) {
    const lines = csv.split("\n");
    const result = [];
    // Detecta se o Google usou vírgula ou ponto e vírgula como separador
    const separador = lines[0].includes(";") ? ";" : ",";
    const headers = lines[0].split(separador).map(h => h.replace(/"/g, "").trim());

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i]) continue;
        const obj = {};
        const currentline = lines[i].split(separador);

        headers.forEach((header, s) => {
            let value = currentline[s] ? currentline[s].replace(/"/g, "").trim() : "";
            
            // Tratamento especial para números (remove R$, pontos e converte vírgula em ponto)
            if (["preco", "aluguel_estimado", "valorizacao_estimada"].includes(header)) {
                let num = value.replace(/[R$\.\s]/g, "").replace(",", ".");
                obj[header] = parseFloat(num) || 0;
            } else {
                obj[header] = value;
            }
        });
        result.push(obj);
    }
    return result;
}

const container = document.getElementById('resultados');

// Busca os dados na Web com o link correto
fetch(URL_FINAL)
    .then(res => res.text())
    .then(csvText => {
        imoveisData = csvToJSON(csvText);
        console.log("Planilha carregada com sucesso!");
    })
    .catch(err => {
        console.error(err);
        container.innerHTML = '<p style="color:red">Erro ao carregar dados. Verifique sua conexão.</p>';
    });

// Evento do Botão
document.getElementById('buscar').addEventListener('click', () => {
    const valorMax = parseFloat(document.getElementById('valor').value);
    const cidade = document.getElementById('cidade').value;
    const tipo = document.getElementById('tipo').value;
    const fase = document.getElementById('fase').value;

    if (!valorMax) {
        alert("Digite um valor máximo para investir.");
        return;
    }

    // Filtros combinados
    let filtrados = imoveisData.filter(item => {
        return item.preco <= valorMax &&
               (cidade === "" || item.cidade === cidade) &&
               (tipo === "" || item.tipo === tipo) &&
               (fase === "" || item.fase === fase);
    });

    // Ranking Score
    filtrados.forEach(item => {
        let yieldAnual = item.preco > 0 ? (item.aluguel_estimado * 12 / item.preco) * 100 : 0;
        let bonusFase = item.fase === 'Lançamento' ? 10 : 0;
        item.score = (item.valorizacao_estimada + yieldAnual + bonusFase).toFixed(2);
    });

    filtrados.sort((a, b) => b.score - a.score);

    // Mostrar na tela
    container.innerHTML = filtrados.length ? "" : "Nenhum imóvel encontrado para esses critérios.";
    
    filtrados.forEach(item => {
        const div = document.createElement('div');
        div.className = 'resultado-item';
        div.innerHTML = `
            <div class="score-badge">Score: ${item.score}</div>
            <h3>${item.nome}</h3>
            <p><strong>${item.tipo}</strong> - ${item.bairro} (${item.cidade})</p>
            <p>Preço: R$ ${item.preco.toLocaleString('pt-BR')}</p>
            <p>Fase: ${item.fase}</p>
        `;
        container.appendChild(div);
    });
});