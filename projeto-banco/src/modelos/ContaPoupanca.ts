import { Conta } from "./Conta";

export class ContaPoupanca extends Conta {
  get limiteDiario(): number { return 500; }
  get tipo(): string { return "Conta Poupança"; }
}
