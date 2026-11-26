import type { Conta } from "../modelos/Conta";
import { SaqueError } from "../excecoes";
import { brl } from "../utils/formatacao";


export class AtendimentoSaque {
  executar(conta: Conta, valor: number): boolean {
    try {
      conta.sacar(valor);
      console.log(
        `   ✅ Saque de ${brl(valor)} realizado. Novo saldo: ${brl(conta.consultarSaldo())}`
      );
      return true;
    } catch (erro) {
      if (erro instanceof SaqueError) {
        console.log(`   ❌ ${erro.name} [${erro.codigo}]`);
        conta.titular.notificar(erro.message);
        return false;
      }
      throw erro; 
    }
  }
}
