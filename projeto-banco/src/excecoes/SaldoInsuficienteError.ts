import { SaqueError } from "./SaqueError";
import { brl } from "../utils/formatacao";

export class SaldoInsuficienteError extends SaqueError {
  readonly saldo: number;
  readonly valor: number;
  readonly faltante: number;

  constructor(saldo: number, valor: number) {
    const faltante = valor - saldo;
    super(
      `Saldo insuficiente. Saldo: ${brl(saldo)}, saque: ${brl(valor)}. Faltam ${brl(faltante)}.`,
      "SALDO_INSUFICIENTE"
    );
    this.saldo = saldo;
    this.valor = valor;
    this.faltante = faltante;
  }
}
