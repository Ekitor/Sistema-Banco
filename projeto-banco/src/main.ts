import { Cliente, ContaCorrente, ContaPoupanca, Cooperativa } from "./modelos";
import {
  NotificadorSMS,
  NotificadorEmail,
  NotificadorApp,
  NotificadorWhatsApp,
} from "./notificacao";
import { AtendimentoSaque } from "./servicos/AtendimentoSaque";

function titulo(texto: string): void {
  console.log(`\n${"=".repeat(64)}\n${texto}\n${"=".repeat(64)}`);
}

function main(): void {
  const coop = new Cooperativa("Cooperativa de Crédito Esperança");
  const atendimento = new AtendimentoSaque();

  const ana = new Cliente("Ana Souza", "111.111.111-11", "Rua A, 10", 4500, new NotificadorSMS());
  const diego = new Cliente("Diego Lima", "222.222.222-22", "Rua B, 20", 3200, new NotificadorSMS());
  const bruno = new Cliente("Bruno Alves", "333.333.333-33", "Rua C, 30", 5200, new NotificadorEmail());
  const elisa = new Cliente("Elisa Costa", "444.444.444-44", "Rua D, 40", 6100, new NotificadorEmail());
  const carla = new Cliente("Carla Dias", "555.555.555-55", "Rua E, 50", 7000, new NotificadorApp());
  const fabio = new Cliente("Fábio Reis", "666.666.666-66", "Rua F, 60", 2800, new NotificadorApp());
  [ana, diego, bruno, elisa, carla, fabio].forEach((c) => coop.cadastrar(c));

  const anaCorrente = new ContaCorrente("0001-1", "100", ana, 500);
  const anaPoupanca = new ContaPoupanca("0001-2", "100", ana, 100); 
  const diegoPoupanca = new ContaPoupanca("0002-1", "100", diego, 2000);
  const brunoCorrente = new ContaCorrente("0003-1", "100", bruno, 300);
  const elisaPoupanca = new ContaPoupanca("0004-1", "100", elisa, 80);
  const carlaCorrente = new ContaCorrente("0005-1", "100", carla, 5000);
  const fabioCorrente = new ContaCorrente("0006-1", "100", fabio, 700);

  titulo("ASSOCIAÇÕES: cliente ↔ contas");
  console.log(`   ${ana.nome} possui ${ana.contas.length} contas:`);
  ana.contas.forEach((c) => console.log(`     - ${c}`));
  console.log(`   Titular da conta ${diegoPoupanca.numero}: ${diegoPoupanca.titular.nome}`);
  console.log(`   Busca por CPF 333.333.333-33 → ${coop.buscarPorCpf("333.333.333-33")?.nome}`);

  titulo("SITUAÇÃO 1 – Saque com sucesso (2 exemplos)");
  atendimento.executar(anaCorrente, 200);
  atendimento.executar(brunoCorrente, 100);

  titulo("SITUAÇÃO 2 – ValorInvalidoError (2 exemplos)");
  atendimento.executar(anaCorrente, -50);
  atendimento.executar(elisaPoupanca, 0);

  titulo("SITUAÇÃO 3 – ContaBloqueadaError (2 exemplos)");
  carlaCorrente.bloquear();
  atendimento.executar(carlaCorrente, 50);
  fabioCorrente.bloquear();
  atendimento.executar(fabioCorrente, 100);
  carlaCorrente.desbloquear();
  fabioCorrente.desbloquear();

  titulo("SITUAÇÃO 4 – SaldoInsuficienteError (2 exemplos)");
  atendimento.executar(anaPoupanca, 150);
  atendimento.executar(elisaPoupanca, 200);

  titulo("SITUAÇÃO 5 – LimiteDiarioExcedidoError (2 exemplos)");
  atendimento.executar(carlaCorrente, 800);
  atendimento.executar(carlaCorrente, 300);
  atendimento.executar(diegoPoupanca, 400);
  atendimento.executar(diegoPoupanca, 200);

  titulo("INTERFACE + POLIMORFISMO – mesma mensagem, 3 canais (2 de cada)");
  const mensagem = "Sua solicitação não pôde ser concluída. Procure a cooperativa para mais detalhes.";
  [ana, diego, bruno, elisa, carla, fabio].forEach((c) => c.notificar(mensagem));

  titulo("EXTENSIBILIDADE – novo canal WhatsApp (só uma nova classe)");
  ana.definirCanal(new NotificadorWhatsApp());
  diego.definirCanal(new NotificadorWhatsApp());
  atendimento.executar(anaPoupanca, 500);
  atendimento.executar(diegoPoupanca, 300);
}

main();
