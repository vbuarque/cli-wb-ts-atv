import { BusinessModel, Client } from "../models";
import { Input } from "../shared/utils";

export class DashboardController {
  private input: Input;
  private clientList: Array<Client>;

  constructor(business: BusinessModel) {
    this.input = new Input();
    this.clientList = business.clients;
  }

  actionsDashboard() {
    console.log(
      `\n
      Opções de DASHBOARD: 
      1 - Clientes que MAIS consumiram - TOP 10
      2 - Clientes que MENOS consumiram - TOP 10
      3 - Clientes que MAIS consumiram R$ - TOP 5
      4 - Clientes por GÊNERO
      5 - Produtos/Serviços mais consumidos
      6 - Produtos/Serviços mais consumidos por GÊNERO
      0 - Voltar ao menu principal \n
      `
    );

    let clientOption = this.input.number(
      `Por favor, escolha uma opção da DASHBOARD:`
    );
    switch (clientOption) {
      case 0:
        return;
      case 1:
        this.getClientsDESC();
        break;
      case 2:
        this.getClientsASC();
        break;
      case 3:
        this.getClientsInValueDESC();
        break;
      case 4:
        this.getClientsPerGender();
        break;
      case 5:
        this.getProductsAndServices();
        break;
      case 6:
        this.getProductsAndServicesPerGender();
        break;
      default:
        console.log(`Operação não entendida :(`);
    }
  }

  public getClientsDESC(): void {
    const report: Array<{ name: string; consumer: number }> =
      this.clientList.map((client) => {
        let countServiceAndProduct = 0;
        client.orders.forEach((order) => {
          order.productList?.forEach(() => countServiceAndProduct++);
          order.serviceList?.forEach(() => countServiceAndProduct++);
        });
        return { name: client.name, consumer: countServiceAndProduct };
      });

    const compare = (a, b) => {
      if (a.consumer > b.consumer) return -1;
      if (a.consumer < b.consumer) return 1;
      return 0;
    };
    report.sort(compare);
    const top10 = report.slice(0, 10);
    console.log("Clientes que MAIS consumiram - TOP 10 \n");
    top10.forEach((client, index) => {
      console.log(`${index + 1} - ${client.name}, Consumo: ${client.consumer}`);
    });
    console.log();
  }

  public getClientsASC(): void {
    const report: Array<{ name: string; consumer: number }> =
      this.clientList.map((client) => {
        let countServiceAndProduct = 0;
        client.orders.forEach((order) => {
          order.productList?.forEach(() => countServiceAndProduct++);
          order.serviceList?.forEach(() => countServiceAndProduct++);
        });
        return { name: client.name, consumer: countServiceAndProduct };
      });

    const compare = (a, b) => {
      if (a.consumer < b.consumer) return -1;
      if (a.consumer > b.consumer) return 1;
      return 0;
    };
    report.sort(compare);
    const top10 = report.slice(0, 10);
    console.log("Clientes que MENOS consumiram - TOP 10 \n");
    top10.forEach((client, index) => {
      console.log(`${index + 1} - ${client.name}, Consumo: ${client.consumer}`);
    });
    console.log();
  }

  public getClientsInValueDESC(): void {
    const format = {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
    };

    const report: Array<{ name: string; valueConsumer: number }> =
      this.clientList.map((client) => {
        let valueServiceAndProductConsumer = 0;
        client.orders.forEach((order) => {
          valueServiceAndProductConsumer += order.order_amount;
        });
        return {
          name: client.name,
          valueConsumer: valueServiceAndProductConsumer,
        };
      });

    const compare = (a, b) => {
      if (a.valueConsumer > b.valueConsumer) return -1;
      if (a.valueConsumer < b.valueConsumer) return 1;
      return 0;
    };
    report.sort(compare);
    const top5 = report.slice(0, 5);
    console.log("Clientes que MAIS gastaram $$ - TOP 5 \n");
    top5.forEach((client, index) => {
      console.log(
        `${index + 1} - ${
          client.name
        }, Valor Total: ${client.valueConsumer.toLocaleString("pt-BR", format)}`
      );
    });
    console.log();
  }

  public getClientsPerGender(): void {
    const clientList = this.clientList;
    const compare = (a, b) => {
      if (a.gender < b.gender) return -1;
      if (a.gender > b.gender) return 1;
      return 0;
    };
    clientList.sort(compare);

    console.log("Clientes por GÊNERO \n");
    clientList.forEach((client) => {
      console.log(
        `Nome: ${client.name}, Sexo: ${client.gender} - CPF: ${client.getCpf()}`
      );
    });
    console.log();
  }

  public getProductsAndServices(): void {
    const listConsumedProducts: Array<{
      id: number;
      name: string;
      unit: number;
    }> = [];

    const listConsumedService: Array<{
      id: number;
      name: string;
      unit: number;
    }> = [];

    const insertingInList = (listItem, id, name, unit) => {
      const searchItem = (item) => item.id === id;

      let itemFind = listItem.find(searchItem);
      if (itemFind !== undefined) {
        itemFind.unit = itemFind.unit += unit;
      } else {
        listItem.push({ id: id, name: name, unit: unit });
      }
      return;
    };

    this.clientList.forEach((client) => {
      client.orders.forEach((order) => {
        order.productList?.forEach((product) => {
          insertingInList(
            listConsumedProducts,
            product.product.id,
            product.product.name,
            product.unit
          );
        });

        order.serviceList?.forEach((service) => {
          insertingInList(
            listConsumedService,
            service.service.id,
            service.service.name,
            service.unit
          );
        });
      });
    });

    const compare = (a, b) => {
      if (a.unit > b.unit) return -1;
      if (a.unit < b.unit) return 1;
      return 0;
    };

    listConsumedService.sort(compare);
    listConsumedProducts.sort(compare);

    console.log("PRODUTOS MAIS CONSUMIDOS \n");
    listConsumedProducts.forEach((product) => {
      console.log(`Produto: ${product.name}, Total: ${product.unit}`);
    });
    console.log();
    console.log("SERVIÇOS MAIS CONSUMIDOS \n");
    listConsumedService.forEach((service) => {
      console.log(`Serviço: ${service.name}, Total: ${service.unit}`);
    });
    console.log();
  }

  public getProductsAndServicesPerGender(): void {
    const listConsumedProductsGenderMasc: Array<{
      id: number;
      name: string;
      unit: number;
    }> = [];
    const listConsumedProductsGenderFemale: Array<{
      id: number;
      name: string;
      unit: number;
    }> = [];

    const listConsumedServiceGenderFemale: Array<{
      id: number;
      name: string;
      unit: number;
    }> = [];
    const listConsumedServiceGenderMasc: Array<{
      id: number;
      name: string;
      unit: number;
    }> = [];

    const insertingInList = (listItem, id, name, unit) => {
      const searchItem = (item) => item.id === id;

      let itemFind = listItem.find(searchItem);
      if (itemFind !== undefined) {
        itemFind.unit = itemFind.unit += unit;
      } else {
        listItem.push({ id: id, name: name, unit: unit });
      }
      return;
    };

    this.clientList.forEach((client) => {
      client.orders.forEach((order) => {
        order.productList?.forEach((product) => {
          if (client.gender === "Masculino") {
            insertingInList(
              listConsumedProductsGenderMasc,
              product.product.id,
              product.product.name,
              product.unit
            );
          } else {
            insertingInList(
              listConsumedProductsGenderFemale,
              product.product.id,
              product.product.name,
              product.unit
            );
          }
        });

        order.serviceList?.forEach((service) => {
          if (client.gender === "Masculino") {
            insertingInList(
              listConsumedServiceGenderMasc,
              service.service.id,
              service.service.name,
              service.unit
            );
          } else {
            insertingInList(
              listConsumedServiceGenderFemale,
              service.service.id,
              service.service.name,
              service.unit
            );
          }
        });
      });
    });

    const compare = (a, b) => {
      if (a.unit > b.unit) return -1;
      if (a.unit < b.unit) return 1;
      return 0;
    };

    listConsumedServiceGenderFemale.sort(compare);
    listConsumedServiceGenderMasc.sort(compare);
    listConsumedProductsGenderMasc.sort(compare);
    listConsumedProductsGenderFemale.sort(compare);

    console.log("PRODUTOS MAIS CONSUMIDOS - GÊNERO FEMININO\n");
    listConsumedServiceGenderFemale.forEach((product) => {
      console.log(`Produto: ${product.name}, Total: ${product.unit}`);
    });
    console.log();
    console.log("PRODUTOS MAIS CONSUMIDOS - GÊNERO MASCULINO\n");
    listConsumedServiceGenderMasc.forEach((product) => {
      console.log(`Produto: ${product.name}, Total: ${product.unit}`);
    });
    console.log();
    console.log("SERVIÇOS MAIS CONSUMIDOS - GÊNERO FEMININO\n");
    listConsumedServiceGenderFemale.forEach((service) => {
      console.log(`Serviço: ${service.name}, Total: ${service.unit}`);
    });
    console.log();
    console.log("SERVIÇOS MAIS CONSUMIDOS - GÊNERO MASCULINO\n");
    listConsumedServiceGenderMasc.forEach((service) => {
      console.log(`Serviço: ${service.name}, Total: ${service.unit}`);
    });
    console.log();
  }
}
