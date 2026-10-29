// Exercício 03: Simulador de parcelamento
const campoPreco = document.getElementById('preco');
const campoEntrada = document.getElementById('entrada');
const botao = document.getElementById('simular');
const saida = document.getElementById('resultado');
const corpoTabela = document.getElementById('parcelas');
/** Até 3 parcelas sem juros; a partir de 4, juros compostos de 2% ao mês. */
function calcularTotal(valor, parcelas) {
    return parcelas <= 3 ? valor : valor * 1.02 ** parcelas;
}
/** Devolve as linhas <tr> da tabela de parcelamento. */
function simularParcelamento(preco, entrada) {
    const financiado = typeof entrada !== 'undefined' ? preco - entrada : preco;
    const naoOferecidas = [7, 8, 9, 11];
    let linhas = '';
    for (let parcelas = 1; parcelas <= 12; parcelas++) {
        if (naoOferecidas.includes(parcelas)) {
            continue; // a loja não oferece essa quantidade
        }
        const total = calcularTotal(financiado, parcelas);
        const valorParcela = total / parcelas;
        if (valorParcela < 50) {
            break; // parcela mínima de R$ 50,00: as opções acabam
        }
        const juros = parcelas <= 3 ? 'sem juros' : '2% a.m.';
        linhas +=
            `<tr><td>${parcelas}x</td><td>R$ ${valorParcela.toFixed(2)}</td>` +
                `<td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
    }
    return linhas;
}
botao.addEventListener('click', () => {
    const preco = campoPreco.valueAsNumber;
    corpoTabela.innerHTML = '';
    if (Number.isNaN(preco) || preco <= 0) {
        saida.textContent = 'Informe um preço válido';
        saida.className = 'erro';
        return;
    }
    let linhas;
    let financiado = preco;
    if (campoEntrada.value === '') {
        linhas = simularParcelamento(preco); // sem o 2º argumento
    }
    else {
        const entrada = campoEntrada.valueAsNumber;
        if (entrada < 0) {
            saida.textContent = 'Informe uma entrada válida';
            saida.className = 'erro';
            return;
        }
        if (entrada >= preco) {
            saida.textContent = 'A entrada cobre o valor total. Não há parcelas.';
            saida.className = 'sucesso';
            return;
        }
        financiado = preco - entrada;
        linhas = simularParcelamento(preco, entrada);
    }
    saida.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
    saida.className = '';
    corpoTabela.innerHTML =
        linhas || '<tr><td colspan="4">Nenhuma opção de parcelamento disponível.</td></tr>';
});
export {};
//# sourceMappingURL=ex03.js.map