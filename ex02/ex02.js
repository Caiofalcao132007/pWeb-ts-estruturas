// Exercício 02: Conta de luz
const campoConsumo = document.getElementById('consumo');
const campoTipo = document.getElementById('tipo');
const campoBandeira = document.getElementById('bandeira');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
/** Tarifa por kWh. Cases agrupados: sem break entre eles. */
function tarifaPorKwh(tipo) {
    switch (tipo) {
        case 'residencial':
        case 'rural':
            return 0.8;
        case 'comercial':
        case 'industrial':
            return 0.95;
    }
}
/** Adicional da bandeira. Se a bandeira não for informada, assume 'verde'. */
function adicionalBandeira(consumo, bandeira = 'verde') {
    switch (bandeira) {
        case 'verde':
            return 0;
        case 'amarela':
            return consumo * 0.02;
        case 'vermelha1':
            return consumo * 0.04;
        case 'vermelha2':
            return consumo * 0.08;
    }
}
/** Mensagem da bandeira. As duas vermelhas compartilham o mesmo bloco. */
function mensagemBandeira(bandeira) {
    switch (bandeira) {
        case 'amarela':
            return 'Condições de geração menos favoráveis.';
        case 'vermelha1':
        case 'vermelha2':
            return 'Condições mais caras de geração. Economize!';
        default:
            return 'Condições favoráveis de geração de energia.';
    }
}
/** Nome da bandeira para exibir na tela. */
function nomeBandeira(bandeira) {
    switch (bandeira) {
        case 'verde':
            return 'Bandeira verde';
        case 'amarela':
            return 'Bandeira amarela';
        case 'vermelha1':
            return 'Bandeira vermelha (patamar 1)';
        case 'vermelha2':
            return 'Bandeira vermelha (patamar 2)';
    }
}
// Teste do parâmetro padrão: resultado = 0.
// Motivo: sem o 2º argumento, bandeira vale 'verde', que não tem adicional.
console.log(adicionalBandeira(100));
botao.addEventListener('click', () => {
    const consumo = campoConsumo.valueAsNumber;
    if (Number.isNaN(consumo) || consumo <= 0) {
        saida.textContent = 'Informe um consumo válido';
        saida.className = 'erro';
        return;
    }
    const tipo = campoTipo.value;
    const bandeira = campoBandeira.value;
    const energia = consumo * tarifaPorKwh(tipo);
    const adicional = adicionalBandeira(consumo, bandeira);
    const total = energia + adicional;
    saida.textContent =
        `Energia: R$ ${energia.toFixed(2)}\n` +
            `${nomeBandeira(bandeira)}: R$ ${adicional.toFixed(2)}\n` +
            `Total: R$ ${total.toFixed(2)}\n` +
            mensagemBandeira(bandeira);
    saida.className = bandeira !== 'verde' ? 'alerta' : '';
});
export {};
//# sourceMappingURL=ex02.js.map