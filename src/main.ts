import { Input } from "./domain/shared/utils";
import BusinessModel from "./domain/models/Business.model";

import {
  ClientController,
  ProductController,
  ServiceController,
  OrderController,
  DashboardController,
} from "./domain/controllers";

import { ValuesDefault } from "./domain/shared/utils/ValuesDefault";

console.log(`Bem-vindo ao Grupo World Beauty \n`);
let exec = true;
let business = new BusinessModel();
let generatingValuesDefault = new ValuesDefault(business);
generatingValuesDefault.create();

while (exec) {
  let input = new Input();
  console.log(`MENU PRINCIPAL`);
  console.log(`1 - Clientes`);
  console.log(`2 - Serviço`);
  console.log(`3 - Produtos`);
  console.log(`4 - Pedidos`);
  console.log(`5 - Relatórios`);
  console.log(`0 - Sair \n`);
  let inputOption = input.number(`Por favor, escolha uma opção: `);

  switch (inputOption) {
    case 0:
      exec = false;
      console.log(`Até mais`);
      break;
    case 1:
      const clientController = new ClientController(business);
      clientController.actionsClient();
      break;
    case 2:
      const serviceController = new ServiceController(business);
      serviceController.actionsService();
      break;
    case 3:
      const productController = new ProductController(business);
      productController.actionsProduct();
      break;
    case 4:
      const orderController = new OrderController(business);
      orderController.actionsOrder();
      break;
    case 5:
      const dashboardController = new DashboardController(business);
      dashboardController.actionsDashboard();
      break;
    default:
      console.log(`Operação não entendida :(`);
  }
}
