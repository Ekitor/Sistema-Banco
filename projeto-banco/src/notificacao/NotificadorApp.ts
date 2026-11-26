import type { INotificador } from "./INotificador";
import type { Cliente } from "../modelos/Cliente";

export class NotificadorApp implements INotificador {
  readonly canal = "Aplicativo";

  enviar(destinatario: Cliente, mensagem: string): void {
    console.log(`   🔔 [APP (push imediata) → ${destinatario.nome}] ${mensagem}`);
  }
}
