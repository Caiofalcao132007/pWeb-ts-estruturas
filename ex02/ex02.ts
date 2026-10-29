// Exercício 02: Conta de luz

type TipoCliente = 'residencial' | 'rural' | 'comercial' | 'industrial';
type Bandeira = 'verde' | 'amarela' | 'vermelha1' | 'vermelha2';

const campoConsumo = document.getElementById('consumo') as HTMLInputElement;
const campoTipo = document.getElementById('tipo') as HTMLSelectElement;
const campoBandeira = document.getElementById('bandeira') as HTMLSelectElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

/** Tarifa por kWh. Cases agrupados: sem break entre eles. */
function tarifaPorKwh(tipo: TipoCliente): number {
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
function adicionalBandeira(consumo: number, bandeira: Bandeira = 'verde'): number {
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
function mensagemBandeira(bandeira: Bandeira): string {
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
function nomeBandeira(bandeira: Bandeira): string {
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

  const tipo = campoTipo.value as TipoCliente;
  const bandeira = campoBandeira.value as Bandeira;

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
