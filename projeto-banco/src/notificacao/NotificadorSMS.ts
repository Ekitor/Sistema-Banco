import type { INotificador } from "./INotificador";
import type { Cliente } from "../modelos/Cliente";

export class NotificadorSMS implements INotificador {
  readonly canal = "SMS";

  enviar(destinatario: Cliente, mensagem: string): void {
    const curta = mensagem.length > 100 ? mensagem.slice(0, 97) + "..." : mensagem; // SMS é curtinho
    console.log(`   [SMS → ${destinatario.nome}] ${curta}`);
  }
}
