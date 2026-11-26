import type { Cliente } from "./Cliente";

export class Cooperativa {
  readonly nome: string;
  private _clientes: Cliente[] = []; // associação 1 → 0..*

  constructor(nome: string) {
    this.nome = nome;
  }

  cadastrar(cliente: Cliente): void {
    this._clientes.push(cliente);
  }

  buscarPorCpf(cpf: string): Cliente | undefined {
    return this._clientes.find((c) => c.cpf === cpf);
  }

  get clientes(): readonly Cliente[] {
    return [...this._clientes];
  }
}
