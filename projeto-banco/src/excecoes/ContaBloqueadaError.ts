import { SaqueError } from "./SaqueError";

export class ContaBloqueadaError extends SaqueError {
  readonly numeroConta: string;

  constructor(numeroConta: string) {
    super(
      `A conta ${numeroConta} está bloqueada. Procure o atendimento da cooperativa.`,
      "CONTA_BLOQUEADA"
    );
    this.numeroConta = numeroConta;
  }
}
