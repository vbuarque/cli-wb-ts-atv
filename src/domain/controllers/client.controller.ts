import { BusinessModel, Client as ClientModel } from "../models";
import { Phone } from "../shared/models";
import { Input, random, findClient } from "../shared/utils";

export class ClientController {
  private input: Input;
  private clientList: Array<ClientModel>;
  private business: BusinessModel;

  constructor(business: BusinessModel) {
    this.input = new Input();
    this.clientList = business.clients;
    this.business = business;
  }

  actionsClient() {
    console.log(
      `\n
      Opções de Cliente: 
      1 - Cadastrar cliente
      2 - Listar todos os clientes
      3 - Atualizar cadastro do cliente
      4 - Mostrar informação de um cliente
      5 - Remover cliente 
      0 - Voltar ao menu principal \n
      `
    );

    let clientOption = this.input.number(
      `Por favor, escolha uma opção de cliente: `
    );
    switch (clientOption) {
      case 0:
        return;
      // break;
      case 1:
        this.create();
        break;
      case 2:
        this.index();
        break;
      case 3:
        this.put();
        break;
      case 4:
        this.show();
        break;
      case 5:
        this.delete();
        break;
      default:
        console.log(`Operação não entendida :(`);
    }
  }

  public create(): void {
    console.log("\nInício do cadastro do cliente");

    const name = this.input.text(`Nome completo: `);
    const email = this.input.text("Email: ");
    const cpfNumber = this.input.text("CPF: ");
    let gender = this.input.text(
      "Sexo (M - Masculino, F - Feminino, O - Outro): "
    );
    gender === "M" ? "Masculino" : gender === "F" ? "Feminino" : "Outros";
    const birthDate = this.input.text("Data de nascimento (Mês/Dia/Ano): ");

    const ddd = this.input.number("Número (DDD): ");
    const number = this.input.number("Número: ");
    const phoneList: Phone[] = [];

    phoneList.push(new Phone(ddd, number));
    const birthDateAux = new Date(birthDate);

    const timestamp = Date.now();
    const id = random(timestamp);

    const client = new ClientModel(
      id,
      email,
      name,
      cpfNumber,
      birthDateAux,
      gender,
      phoneList
    );

    this.clientList.push(client);
    console.log("\nCadastro concluído :)\n");
  }

  public index(): void {
    console.log(`\nLista de todos os clientes:`);
    this.clientList.forEach((client) => {
      console.log(`
      Nome: ${client.name}
      CPF: ${client.getCpf()}
      --------------------------------------`);
    });
    console.log(`\n`);
  }

  public show(): void {
    const client: ClientModel = findClient(this.clientList);
    console.log(`
    Nome: ${client.name}
    CPF: ${client.getCpf()}
    --------------------------------------`);
    console.log(`\n`);
  }

  public put(): void {
    const client: ClientModel = findClient(this.clientList);
    let name = this.input.text(`Atualizar nome do cliente: `);
    let email = this.input.text(`Atualizar email do cliente: `);
    const payload = { email, name };
    client.updateInfo = payload;
    console.log(`\n`);
  }

  public delete(): void {
    const client: ClientModel = findClient(this.clientList);

    const clientListUpdated = this.clientList.filter(
      (clientRemoved: ClientModel) => {
        return clientRemoved.getCpf() !== client.getCpf();
      }
    );

    this.business.setListClient(clientListUpdated);
    console.log(`\n`);
  }
}
