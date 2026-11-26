import { SaqueError } from "./SaqueError";

export class ValorInvalidoError extends SaqueError {
  readonly valor: number;

  constructor(valor: number) {
    super(`Valor inválido para a operação: ${valor}.`, "VALOR_INVALIDO");
    this.valor = valor;
  }
}
