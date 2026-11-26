import type { INotificador } from "./INotificador";
import type { Cliente } from "../modelos/Cliente";

export class NotificadorWhatsApp implements INotificador {
  readonly canal = "WhatsApp";

  enviar(destinatario: Cliente, mensagem: string): void {
    console.log(`   💬 [WHATSAPP → ${destinatario.nome}] ${mensagem}`);
  }
}
