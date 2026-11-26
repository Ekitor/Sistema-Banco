import { SaqueError } from "./SaqueError";
import { brl } from "../utils/formatacao";

export class LimiteDiarioExcedidoError extends SaqueError {
  readonly limite: number;
  readonly jaSacado: number;

  constructor(limite: number, jaSacado: number, valor: number) {
    super(
      `Limite diário excedido. Limite: ${brl(limite)}, já sacado hoje: ${brl(jaSacado)}, ` +
        `tentativa: ${brl(valor)}. Disponível hoje: ${brl(Math.max(limite - jaSacado, 0))}.`,
      "LIMITE_DIARIO_EXCEDIDO"
    );
    this.limite = limite;
    this.jaSacado = jaSacado;
  }
}
