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
    { nome: "Mirante do Mar", cidade: "São José", bairro: "Serraria", preco: 380000, tipo: "Apartamento", fase: "Lançamento", aluguel: 1900, valorizacao: 13, m2: 58 },
    { nome: "Recanto do Campeche", cidade: "Florianópolis", bairro: "Campeche", preco: 950000, tipo: "Casa", fase: "Pronto", aluguel: 5000, valorizacao: 14, m2: 145 },
    { nome: "Eco Village", cidade: "Palhoça", bairro: "Guarda", preco: 280000, tipo: "Terreno", fase: "Lançamento", aluguel: 0, valorizacao: 25, m2: 300 },
    { nome: "Business Tower", cidade: "São José", bairro: "Kobrasol", preco: 410000, tipo: "Apartamento", fase: "Pronto", aluguel: 2500, valorizacao: 7, m2: 42 },
    { nome: "Marinas do Norte", cidade: "Florianópolis", bairro: "Jurerê", preco: 2500000, tipo: "Casa", fase: "Lançamento", aluguel: 12000, valorizacao: 10, m2: 420 },
    { nome: "Apto Decorado Cachoeira", cidade: "Florianópolis", bairro: "Cachoeira", preco: 2633455, tipo: "Apartamento", fase: "Pronto", aluguel: 7700, valorizacao: 10, m2: 128 },
    { nome: "Apto Mobiliado Jurerê", cidade: "Florianópolis", bairro: "Jurerê", preco: 1050000, tipo: "Apartamento", fase: "Pronto", aluguel: 3220, valorizacao: 10, m2: 84 },
    { nome: "Novo Nível Canasvieiras", cidade: "Florianópolis", bairro: "Canasvieiras", preco: 1684070, tipo: "Apartamento", fase: "Pronto", aluguel: 3670, valorizacao: 10, m2: 102 },
    { nome: "Apto Mobiliado Itacorubi", cidade: "Florianópolis", bairro: "Itacorubi", preco: 1790000, tipo: "Apartamento", fase: "Pronto", aluguel: 3325, valorizacao: 10, m2: 92 },
    { nome: "Apto Praça XV", cidade: "Florianópolis", bairro: "Centro", preco: 575000, tipo: "Apartamento", fase: "Pronto", aluguel: 2800, valorizacao: 10, m2: 54 },
    { nome: "Morar no Cacupé", cidade: "Florianópolis", bairro: "Cacupé", preco: 906600, tipo: "Apartamento", fase: "Pronto", aluguel: 2100, valorizacao: 10, m2: 112 },
    { nome: "Cobertura Yachtclube", cidade: "Florianópolis", bairro: "Jurerê", preco: 6899770, tipo: "Cobertura", fase: "Pronto", aluguel: 6300, valorizacao: 10, m2: 315 },
    { nome: "Apto Mar João Paulo", cidade: "Florianópolis", bairro: "João Paulo", preco: 1940515, tipo: "Apartamento", fase: "Pronto", aluguel: 3465, valorizacao: 10, m2: 138 },
    { nome: "Terraço do Lago (2 dorm)", cidade: "Palhoça", bairro: "Pedra Branca", preco: 999000, tipo: "Apartamento", fase: "Lançamento", aluguel: 3000, valorizacao: 15, m2: 83 },
    { nome: "Terraço do Lago (3 dorm)", cidade: "Palhoça", bairro: "Pedra Branca", preco: 1358800, tipo: "Apartamento", fase: "Lançamento", aluguel: 3800, valorizacao: 15, m2: 114 },
    { nome: "Terraço do Lago (COB)", cidade: "Palhoça", bairro: "Pedra Branca", preco: 3900000, tipo: "Cobertura", fase: "Lançamento", aluguel: 7500, valorizacao: 15, m2: 221 },
    { nome: "Terreno Praia do Sonho", cidade: "Palhoça", bairro: "P. Sonho", preco: 100000, tipo: "Terreno", fase: "Pronto", aluguel: 0, valorizacao: 10, m2: 300 },
    { nome: "Terreno Pinheira", cidade: "Palhoça", bairro: "Pinheira", preco: 159900, tipo: "Terreno", fase: "Pronto", aluguel: 0, valorizacao: 10, m2: 360 },
    { nome: "Terreno Forquilhas", cidade: "São José", bairro: "Forquilhas", preco: 169600, tipo: "Terreno", fase: "Pronto", aluguel: 0, valorizacao: 10, m2: 200 },
    { nome: "Terreno Potecas", cidade: "São José", bairro: "Potecas", preco: 138500, tipo: "Terreno", fase: "Pronto", aluguel: 0, valorizacao: 10, m2: 250 },
    { nome: "Terreno Vivenda S. José", cidade: "São José", bairro: "Forquilhas", preco: 205000, tipo: "Terreno", fase: "Pronto", aluguel: 0, valorizacao: 10, m2: 360 },
    
    // --- CHÁCARAS ---
    { nome: "Sítio 20.000 m² (Biguaçu)", cidade: "Biguaçu", bairro: "Interior", preco: 399000, tipo: "Chácara", fase: "Pronto", aluguel: 0, valorizacao: 15, m2: 20000 },
    { nome: "Terreno chácara (Canelinha)", cidade: "Canelinha", bairro: "Centro", preco: 180000, tipo: "Chácara", fase: "Pronto", aluguel: 0, valorizacao: 12, m2: 2000 },
    { nome: "Sítio Águas Mornas", cidade: "Imaruí", bairro: "Rural", preco: 135000, tipo: "Chácara", fase: "Pronto", aluguel: 0, valorizacao: 10, m2: 2800 },
    { nome: "Linda chácara Bela Vista", cidade: "Palhoça", bairro: "Bela Vista", preco: 150000, tipo: "Chácara", fase: "Pronto", aluguel: 0, valorizacao: 10, m2: 1600 },
    { nome: "Sítio em Angelina", cidade: "Angelina", bairro: "Interior", preco: 279000, tipo: "Chácara", fase: "Pronto", aluguel: 0, valorizacao: 12, m2: 3500 },
    { nome: "Sítio perto da cidade", cidade: "Orleans", bairro: "Rural", preco: 200000, tipo: "Chácara", fase: "Pronto", aluguel: 0, valorizacao: 10, m2: 5000 },
    { nome: "Chácara Vargem do Braço", cidade: "Palhoça", bairro: "Caldas da Imperatriz", preco: 450000, tipo: "Chácara", fase: "Pronto", aluguel: 0, valorizacao: 18, m2: 36000 },
    { nome: "Sítio 47.000 m² Maciambú", cidade: "Palhoça", bairro: "Passagem do Maciambú", preco: 1400000, tipo: "Chácara", fase: "Pronto", aluguel: 0, valorizacao: 20, m2: 47000 }
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