import type { Conta } from "./Conta";
import type { INotificador } from "../notificacao/INotificador";
import { ValorInvalidoError } from "../excecoes";

export class Cliente {
  private _nome: string;
  private readonly _cpf: string;
  private _endereco: string;
  private _renda: number;
  private _contas: Conta[] = []; 
  private _canal: INotificador; 

  constructor(
    nome: string,
    cpf: string,
    endereco: string,
    renda: number,
    canal: INotificador
  ) {
    this._nome = nome;
    this._cpf = cpf;
    this._endereco = endereco;
    this._renda = renda;
    this._canal = canal;
  }

  get nome(): string { return this._nome; }
  get cpf(): string { return this._cpf; }
  get endereco(): string { return this._endereco; }
  get renda(): number { return this._renda; }
  get contas(): readonly Conta[] { return [...this._contas]; }
  get canal(): INotificador { return this._canal; }

  set endereco(valor: string) { this._endereco = valor; }
  set renda(valor: number) {
    if (!Number.isFinite(valor) || valor < 0) throw new ValorInvalidoError(valor);
    this._renda = valor;
  }

  definirCanal(canal: INotificador): void {
    this._canal = canal;
  }

 
  vincularConta(conta: Conta): void {
    this._contas.push(conta);
  }

 
  notificar(mensagem: string): void {
    this._canal.enviar(this, mensagem);
  }
}
