// Exercício 04: Meta de economia

type Formatador = (valor: number) => string;

type Resultado = { meses: number; saldo: number; depositado: number };

const campoMeta = document.getElementById('meta') as HTMLInputElement;
const campoDeposito = document.getElementById('deposito') as HTMLInputElement;
const campoTaxa = document.getElementById('taxa') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

const formatarReal: Formatador = (valor: number): string => `R$ ${valor.toFixed(2)}`;

/** Ex.: 19 -> "1 ano e 7 meses"; 25 -> "2 anos e 1 mês"; 8 -> "8 meses". */
const formatarMeses: (meses: number) => string = (meses: number): string => {
  const anos = Math.floor(meses / 12);
  const resto = meses % 12;
  const textoAnos = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  const textoMeses = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;

  if (anos === 0) return textoMeses;
  if (resto === 0) return textoAnos;
  return `${textoAnos} e ${textoMeses}`;
};

/**
 * Simula mês a mês: o saldo rende e depois entra o depósito.
 * Em todo mês 12, 24, 36... entra um depósito extra (13º).
 * Para ao atingir a meta ou ao chegar a 600 meses.
 */
function calcularMeses(meta: number, deposito: number, taxa: number = 0.5): Resultado {
  let saldo = 0;
  let depositado = 0;
  let meses = 0;

  while (saldo < meta) {
    if (meses >= 600) {
      break;
    }
    meses++;
    saldo = saldo * (1 + taxa / 100) + deposito;
    depositado += deposito;

    if (meses % 12 === 0) {
      saldo += deposito; // 13º: depósito dobrado
      depositado += deposito;
    }
  }

  return { meses, saldo, depositado };
}

function exibirValor(rotulo: string, valor: number, formatar: Formatador): string {
  return `${rotulo}: ${formatar(valor)}`;
}

botao.addEventListener('click', () => {
  const meta = campoMeta.valueAsNumber;
  const deposito = campoDeposito.valueAsNumber;

  if (!(meta > 0) || !(deposito > 0)) {
    saida.textContent = 'Informe valores positivos';
    saida.className = 'erro';
    return;
  }

  const resultado =
    campoTaxa.value === ''
      ? calcularMeses(meta, deposito)
      : calcularMeses(meta, deposito, campoTaxa.valueAsNumber);

  const atingiu = resultado.saldo >= meta;
  const rendimento = resultado.saldo - resultado.depositado;

  if (atingiu) {
    saida.textContent =
      `Você atinge a meta em ${resultado.meses} meses (${formatarMeses(resultado.meses)}).\n` +
      exibirValor('Saldo final', resultado.saldo, formatarReal) + '\n' +
      exibirValor('Total depositado', resultado.depositado, formatarReal) + '\n' +
      exibirValor('Rendimento', rendimento, formatarReal);
    saida.className = 'sucesso';
  } else {
    saida.textContent =
      'Meta inalcançável em 50 anos.\n' +
      exibirValor('Saldo após 600 meses', resultado.saldo, formatarReal);
    saida.className = 'erro';
  }
});
