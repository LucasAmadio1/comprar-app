/** 12.9 -> "R$ 12,90" (sem depender do Intl do dispositivo). */
export function formatCurrency(value: number): string {
  const [integer, cents] = value.toFixed(2).split(".");
  const withThousands = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `R$ ${withThousands},${cents}`;
}

/**
 * "12,90" -> 12.9 | "1.250,50" -> 1250.5 | "12.90" -> 12.9.
 * Retorna null quando o texto não é um número válido.
 */
export function parseCurrency(text: string): number | null {
  const value = text.trim();

  if (!value) {
    return null;
  }

  // Sem vírgula, "12.90" é decimal (teclado em inglês); "1.250" é milhar.
  const isDotDecimal = !value.includes(",") && /^\d+\.\d{1,2}$/.test(value);
  const normalized = isDotDecimal
    ? value
    : value.replace(/\./g, "").replace(",", ".");

  const parsed = Number.parseFloat(normalized);

  return Number.isNaN(parsed) ? null : parsed;
}
