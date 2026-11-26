import type { Cliente } from "./Cliente";
import {
  ValorInvalidoError,
  ContaBloqueadaError,
  SaldoInsuficienteError,
  LimiteDiarioExcedidoError,
} from "../excecoes";
import { brl } from "../utils/formatacao";

export abstract class Conta {
  private _saldo: number;
  private _bloqueada = false;
  private _sacadoHoje = 0;
  private readonly _numero: string;
  private readonly _agencia: string;
  private readonly _dataAbertura: Date;
  private readonly _titular: Cliente; // associação Conta → Cliente (N → 1)

  constructor(
    numero: string,
    agencia: string,
    titular: Cliente,
    saldoInicial = 0,
    dataAbertura: Date = new Date()
  ) {
    if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
      throw new ValorInvalidoError(saldoInicial);
    }
    this._numero = numero;
    this._agencia = agencia;
    this._titular = titular;
    this._saldo = saldoInicial;
    this._dataAbertura = dataAbertura;
    titular.vincularConta(this);
  }


  abstract get limiteDiario(): number;
  abstract get tipo(): string;

  get numero(): string { return this._numero; }
  get agencia(): string { return this._agencia; }
  get dataAbertura(): Date { return this._dataAbertura; }
  get titular(): Cliente { return this._titular; }
  get bloqueada(): boolean { return this._bloqueada; }
  get sacadoHoje(): number { return this._sacadoHoje; }

  consultarSaldo(): number {
    return this._saldo;
  }

  bloquear(): void { this._bloqueada = true; }
  desbloquear(): void { this._bloqueada = false; }
  reiniciarLimiteDiario(): void { this._sacadoHoje = 0; }

  depositar(valor: number): void {
    if (!Number.isFinite(valor) || valor <= 0) throw new ValorInvalidoError(valor);
    if (this._bloqueada) throw new ContaBloqueadaError(this._numero);
    this._saldo += valor;
  }

 
  sacar(valor: number): void {
    if (!Number.isFinite(valor) || valor <= 0) {
      throw new ValorInvalidoError(valor);
    }
    if (this._bloqueada) {
      throw new ContaBloqueadaError(this._numero);
    }
    if (valor > this._saldo) {
      throw new SaldoInsuficienteError(this._saldo, valor);
    }
    if (this._sacadoHoje + valor > this.limiteDiario) {
      throw new LimiteDiarioExcedidoError(this.limiteDiario, this._sacadoHoje, valor);
    }
    this._saldo -= valor;
    this._sacadoHoje += valor;
  }

  toString(): string {
    return `${this.tipo} ${this._agencia}/${this._numero} (${this._titular.nome}) – saldo ${brl(this._saldo)}`;
  }
}
