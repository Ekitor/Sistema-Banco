import { Conta } from "./Conta";

export class ContaCorrente extends Conta {
  get limiteDiario(): number { return 1000; }
  get tipo(): string { return "Conta Corrente"; }
}
