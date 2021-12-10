import { BusinessModel, Service } from "../models";
import { Input, findService } from "../shared/utils";

export class ServiceController {
  private input: Input;
  private business: BusinessModel;
  private serviceList: Array<Service>;

  constructor(business: BusinessModel) {
    this.input = new Input();
    this.business = business;
    this.serviceList = business.services;
  }

  actionsService() {
    console.log(
      `\n
      Opções de serviço:
      1 - Cadastrar serviço
      2 - Catálogo de serviço
      3 - Buscar serviço
      4 - Atualizar serviço
      5 - Remover serviço 
      0 - Voltar ao menu principal \n
      `
    );
    let serviceOption = this.input.number(`Por favor, escolha uma opção: `);

    switch (serviceOption) {
      case 0:
        return;
      case 1:
        this.create();
        break;
      case 2:
        this.index();
        break;
      case 3:
        this.show();
        break;
      case 4:
        this.put();
        break;
      case 5:
        this.delete();
        break;

      default:
        console.log(`Operação não entendida :(`);
    }
  }

  generatingServiceCode() {
    if (this.serviceList.length > 0) {
      const lastServiceCode = this.serviceList[this.serviceList.length - 1];
      let serviceCode = lastServiceCode?.id;
      if (!serviceCode) return 1;
      return serviceCode + 1;
    }
    return 0;
  }

  public create(): void {
    console.log("\nInício do cadastro de serviço");

    const name = this.input.text(`Nome: `);
    const price = this.input.number(`Preço: `);
    const serviceCode: number = this.generatingServiceCode();
    const service = new Service(serviceCode, name, price);

    this.serviceList.push(service);
    console.log("\nCadastro concluído :)\n");
  }

  public index(): void {
    console.log(`\nCatálogo de serviço:`);
    this.serviceList.forEach((service) => {
      console.log(`
      Código do serviço: ${service.id}
      Nome: ${service.name}
      Preço: R$ ${service.price}
      --------------------------------------`);
    });
    console.log(`\n`);
  }

  public show(): void {
    const service: Service = findService(this.serviceList);
    console.log(`
    Nome: ${service.name}
    Preço: R$ ${service.price}
    --------------------------------------`);
    console.log(`\n`);
  }

  public put(): void {
    const service: Service = findService(this.serviceList);
    let price = this.input.number(`Atualizar valor do serviço: `);
    const payload = { price };
    service.update = payload;
    console.log(`\n`);
  }

  public delete(): void {
    const service: Service = findService(this.serviceList);

    const serviceListUpdated = this.serviceList.filter(
      (serviceRemoving: Service) => {
        return serviceRemoving.id !== service.id;
      }
    );

    this.business.setListServices(serviceListUpdated);
    console.log(`\n`);
  }
}
