import type { Cliente } from "../modelos/Cliente";

export interface INotificador {
  readonly canal: string;
  enviar(destinatario: Cliente, mensagem: string): void;
}
