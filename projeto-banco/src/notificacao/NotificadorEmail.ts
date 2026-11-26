import type { INotificador } from "./INotificador";
import type { Cliente } from "../modelos/Cliente";

export class NotificadorEmail implements INotificador {
  readonly canal = "E-mail";

  enviar(destinatario: Cliente, mensagem: string): void {
    console.log(`     [E-MAIL → ${destinatario.nome}]`);
    console.log(`        Assunto: Aviso sobre sua conta`);
    console.log(`        Corpo: Prezado(a) ${destinatario.nome}, ${mensagem}`);
  }
}
