const imoveis = [
    { nome: "Residencial Aurora", cidade: "Palhoça", bairro: "Pedra Branca", preco: 480000, tipo: "Apartamento", fase: "Lançamento", aluguel: 2800, valorizacao: 12, m2: 68 },
    { nome: "Casa Bela Vista", cidade: "São José", bairro: "Barreiros", preco: 650000, tipo: "Casa", fase: "Pronto", aluguel: 3500, valorizacao: 10, m2: 115 },
    { nome: "Terreno Horizonte", cidade: "Florianópolis", bairro: "Centro", preco: 300000, tipo: "Terreno", fase: "Lançamento", aluguel: 0, valorizacao: 15, m2: 216 },
    { nome: "Smart Studio", cidade: "Florianópolis", bairro: "Trindade", preco: 420000, tipo: "Apartamento", fase: "Lançamento", aluguel: 2900, valorizacao: 18, m2: 32 },
    { nome: "Vila dos Açores", cidade: "São José", bairro: "Campinas", preco: 580000, tipo: "Apartamento", fase: "Pronto", aluguel: 3100, valorizacao: 9, m2: 74 },
    { nome: "Loteamento Solare", cidade: "Palhoça", bairro: "Pagani", preco: 250000, tipo: "Terreno", fase: "Pronto", aluguel: 0, valorizacao: 20, m2: 360 },
    { nome: "Garden Residence", cidade: "São José", bairro: "Kobrasol", preco: 720000, tipo: "Apartamento", fase: "Lançamento", aluguel: 3800, valorizacao: 11, m2: 88 },
    { nome: "Ponta das Canas Beach", cidade: "Florianópolis", bairro: "Ponta das Canas", preco: 890000, tipo: "Casa", fase: "Pronto", aluguel: 6500, valorizacao: 12, m2: 160 },
    { nome: "Studio Tech", cidade: "Florianópolis", bairro: "Itacorubi", preco: 450000, tipo: "Apartamento", fase: "Lançamento", aluguel: 3200, valorizacao: 15, m2: 38 },
    { nome: "Pátio das Flores", cidade: "Palhoça", bairro: "Pedra Branca", preco: 550000, tipo: "Apartamento", fase: "Pronto", aluguel: 3000, valorizacao: 8, m2: 72 },
    { nome: "Terraço do Lago (2 dorm)", cidade: "Palhoça", bairro: "Pedra Branca", preco: 999000, tipo: "Apartamento", fase: "Lançamento", aluguel: 3000, valorizacao: 15, m2: 83 },
    { nome: "Terraço do Lago (3 dorm)", cidade: "Palhoça", bairro: "Pedra Branca", preco: 1358800, tipo: "Apartamento", fase: "Lançamento", aluguel: 3800, valorizacao: 15, m2: 114 },
    { nome: "Terraço do Lago (COB)", cidade: "Palhoça", bairro: "Pedra Branca", preco: 3900000, tipo: "Cobertura", fase: "Lançamento", aluguel: 7500, valorizacao: 15, m2: 221 },
    { nome: "Terreno Praia do Sonho", cidade: "Palhoça", bairro: "Praia do Sonho", preco: 100000, tipo: "Terreno", fase: "Pronto", aluguel: 0, valorizacao: 10, m2: 300 },
    { nome: "Terreno Forquilhas", cidade: "São José", bairro: "Forquilhas", preco: 169600, tipo: "Terreno", fase: "Pronto", aluguel: 0, valorizacao: 10, m2: 200 },
    { nome: "Terreno Potecas", cidade: "São José", bairro: "Potecas", preco: 138500, tipo: "Terreno", fase: "Pronto", aluguel: 0, valorizacao: 10, m2: 250 },
    { nome: "Terreno Vivenda São José", cidade: "São José", bairro: "Forquilhas", preco: 205000, tipo: "Terreno", fase: "Pronto", aluguel: 0, valorizacao: 10, m2: 360 }
];

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
        // Cálculo de Score simples para a badge (Valorização + Aluguel)
        const score = imovel.valorizacao + (imovel.aluguel > 0 ? 5 : 0);

        divPos.innerHTML += `
            <div class="resultado-item">
                <div class="score-badge">TOP ${score}</div>
                <h3>${imovel.nome}</h3>
                <p><strong>📍 LOCAL:</strong> ${imovel.bairro} - ${imovel.cidade}</p>
                <p><strong>💰 INVESTIMENTO:</strong> R$ ${imovel.preco.toLocaleString('pt-BR')}</p>
                <p><strong>📏 METRAGEM:</strong> ${imovel.m2} m²</p>
                <p><strong>🔑 FASE:</strong> ${imovel.fase}</p>
                <p><strong>📈 VALORIZAÇÃO:</strong> ${imovel.valorizacao}% a.a.</p>
                ${imovel.aluguel > 0 ? `<p><strong>💵 ALUGUEL EST.:</strong> R$ ${imovel.aluguel.toLocaleString('pt-BR')}</p>` : ''}
            </div>
        `;
    });
}