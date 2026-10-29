// Exercício 05: Caixa do mercado (integrador)
const campoItens = document.getElementById('itens');
const campoCupom = document.getElementById('cupom');
const campoFidelidade = document.getElementById('fidelidade');
const botao = document.getElementById('fechar');
const saida = document.getElementById('resultado');
const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
/** Lê um preço por linha (aceita ponto ou vírgula). Máximo de 20 itens. */
function lerPrecos(texto) {
    const linhas = texto.split('\n');
    const precos = [];
    let ignorados = 0;
    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i].trim();
        if (linha === '') {
            continue; // linha vazia: ignora sem contar
        }
        const valor = Number(linha.replace(',', '.'));
        if (!Number.isFinite(valor) || valor <= 0) {
            ignorados++;
            continue; // linha inválida: ignora e conta
        }
        precos.push(valor);
        if (precos.length === 20) {
            break; // limite de itens por compra
        }
    }
    return { precos, ignorados };
}
/** Soma qualquer quantidade de preços (parâmetro rest). */
function somarItens(...precos) {
    let soma = 0;
    for (const preco of precos) {
        soma += preco;
    }
    return soma;
}
function calcularDesconto(total, regra) {
    if (typeof regra === 'number') {
        return (total * regra) / 100;
    }
    switch (regra.toUpperCase()) {
        case 'BEMVINDO':
            return (total * 10) / 100;
        case 'PROMO20':
            return (total * 20) / 100;
        case 'MENOS15':
            return total >= 100 ? 15 : 0;
        default:
            return 0;
    }
}
botao.addEventListener('click', () => {
    const { precos, ignorados } = lerPrecos(campoItens.value);
    if (precos.length === 0) {
        saida.textContent = 'Nenhum item válido';
        saida.className = 'erro';
        return;
    }
    const subtotal = somarItens(...precos);
    const cupom = campoCupom.value.trim();
    const descontoCupom = cupom !== '' ? calcularDesconto(subtotal, cupom) : 0;
    const aposCupom = subtotal - descontoCupom;
    const descontoFidelidade = campoFidelidade.checked ? calcularDesconto(aposCupom, 5) : 0;
    const total = aposCupom - descontoFidelidade;
    const plural = ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas';
    let texto = `Itens: ${precos.length}` + (ignorados > 0 ? ` (${ignorados} ${plural})` : '') + '\n' +
        `Subtotal: ${formatarReal(subtotal)}\n`;
    if (cupom !== '') {
        texto +=
            descontoCupom > 0
                ? `Cupom ${cupom.toUpperCase()}: - ${formatarReal(descontoCupom)}\n`
                : 'Cupom inválido ou não aplicável\n';
    }
    if (campoFidelidade.checked) {
        texto += `Fidelidade (5%): - ${formatarReal(descontoFidelidade)}\n`;
    }
    texto += `Total a pagar: ${formatarReal(total)}`;
    saida.textContent = texto;
    saida.className = 'sucesso';
});
export {};
//# sourceMappingURL=ex05.js.map