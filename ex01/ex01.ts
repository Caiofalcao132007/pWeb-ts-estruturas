// Exercício 01: Situação do aluno no semestre

const campoNome = document.getElementById('nome') as HTMLInputElement;
const campoN1 = document.getElementById('n1') as HTMLInputElement;
const campoN2 = document.getElementById('n2') as HTMLInputElement;
const campoFrequencia = document.getElementById('frequencia') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

/** Média aritmética das duas notas. */
function calcularMedia(n1: number, n2: number): number {
  return (n1 + n2) / 2;
}

/** Notas de 0 a 10 e frequência de 0 a 100. NaN (campo vazio) é inválido. */
function dadosValidos(n1: number, n2: number, frequencia: number): boolean {
  const notasOk = n1 >= 0 && n1 <= 10 && n2 >= 0 && n2 <= 10;
  const frequenciaOk = frequencia >= 0 && frequencia <= 100;
  return notasOk && frequenciaOk;
}

/**
 * A frequência é testada primeiro: abaixo de 75% reprova
 * por falta, qualquer que seja a média.
 */
function situacao(media: number, frequencia: number): string {
  if (frequencia < 75) {
    return 'Reprovado por falta';
  } else if (media >= 7) {
    return 'Aprovado';
  } else if (media >= 4) {
    return `Exame final (precisa tirar ${(10 - media).toFixed(1)})`;
  } else {
    return 'Reprovado por nota';
  }
}

botao.addEventListener('click', () => {
  const nome = campoNome.value;
  const n1 = campoN1.valueAsNumber;
  const n2 = campoN2.valueAsNumber;
  const frequencia = campoFrequencia.valueAsNumber;

  if (!dadosValidos(n1, n2, frequencia)) {
    saida.textContent = 'Dados inválidos';
    saida.className = 'erro';
    return; // retorno antecipado
  }

  const media = calcularMedia(n1, n2);
  const resultado = situacao(media, frequencia);

  saida.textContent = `${nome}: média ${media.toFixed(1)}. ${resultado}`;
  saida.className = resultado === 'Aprovado' ? 'sucesso' : 'erro';
});
