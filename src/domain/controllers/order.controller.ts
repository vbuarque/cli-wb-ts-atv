import { BusinessModel, Client, Product, Service, Order } from "../models";

import {
  Input,
  findClient,
  findProduct,
  findService,
  findOrder,
  random,
} from "../shared/utils";

export class OrderController {
  private input: Input;
  private clientList: Array<Client>;
  private productList: Array<Product>;
  private serviceList: Array<Service>;

  constructor(business: BusinessModel) {
    this.input = new Input();
    this.clientList = business.clients;
    this.productList = business.products;
    this.serviceList = business.services;
  }

  actionsOrder() {
    console.log(
      `\n
      Opções de Cliente: 
      1 - Cadastrar pedido
      2 - Gerar Recibo
      3 - Pagar pedido 
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
        this.show();
        break;
      case 3:
        this.paidOrder();
        break;
      default:
        console.log(`Operação não entendida :(`);
    }
  }

  handleAddProductInCart() {
    const productCartList: Array<{ product: Product; unit: number }> = [];
    let insertingProductInCart = true;
    do {
      let wantAddInCart = this.input.text(
        "Deseja adicionar um PRODUTO no carrinho ? [S] Sim | [N] Não "
      );
      if (wantAddInCart.toLocaleUpperCase() === "S") {
        const productFind: Product = findProduct(this.productList);

        const unitProduct = this.input.number("Quantidade : ");

        const product = { product: productFind, unit: unitProduct };
        productCartList.push(product);
      } else {
        insertingProductInCart = false;
      }
    } while (insertingProductInCart);
    return productCartList;
  }

  handleAddServiceInCart() {
    const serviceCartList: Array<{ service: Service; unit: number }> = [];

    let insertingServiceInCart = true;

    do {
      let wantAddInCart = this.input.text(
        "Deseja adicionar um SERVIÇO no carrinho ? [S] Sim | [N] Não "
      );
      if (wantAddInCart.toLocaleUpperCase() === "S") {
        const serviceFind: Service = findService(this.serviceList);
        const unit = this.input.number("Quantidade : ");
        const service = { service: serviceFind, unit };
        serviceCartList.push(service);
      } else {
        insertingServiceInCart = false;
      }
    } while (insertingServiceInCart);
    return serviceCartList;
  }

  public create(): void {
    console.log("\nCarrinho Cliente");

    const timestamp = new Date();
    const id = random(timestamp.getTime());
    const client: Client = findClient(this.clientList);

    const seller_id = 1;
    const seller_commission = 3;

    const productCartList = this.handleAddProductInCart();
    const serviceCartList = this.handleAddServiceInCart();

    const order = new Order(
      id,
      client.id,
      timestamp,
      "pending",
      seller_id,
      seller_commission,
      productCartList,
      serviceCartList
    );

    const clientOrders: Order[] = client.orders;
    clientOrders.push(order);
    client.orders = clientOrders;

    console.log("\nCarrinho Criado com sucesso!)\n");
    console.log(`Código do PEDIDO: ${order.id}`);
  }

  public show(orderFound?: Order): void {
    const order: Order = !orderFound ? findOrder(this.clientList) : orderFound;
    const format = {
      minimumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
    };

    console.log(
      `Recibo - ${order.id} ${order.purchase_date.toLocaleDateString(
        "pt-BR"
      )}\n`
    );
    console.log("Código, Nome, Quantidade, Un, Valor");
    console.log("_________________________________________");
    order.productList?.forEach(({ product, unit }) => {
      const orderAmount = unit * product.price;
      const formatOrderAmount = orderAmount.toLocaleString("pt-BR", format);
      console.log(
        `${product.id}, ${product.name}, ${unit} UN, ${formatOrderAmount}`
      );
    });
    order.serviceList?.forEach(({ service, unit }) => {
      const orderAmount = unit * service.price;
      const formatOrderAmount = orderAmount.toLocaleString("pt-BR", format);
      console.log(
        `${service.id}, ${service.name}, ${unit} UN, ${formatOrderAmount}`
      );
    });
    console.log(`Total: ${order.order_amount.toLocaleString("pt-BR", format)}`);
    console.log();
  }

  public paidOrder(): void {
    const order: Order = findOrder(this.clientList);

    this.show(order);

    const wantPaid = this.input.text("Pedido foi pago ? [S] Sim | [N] Não ");

    if (wantPaid.toLocaleUpperCase() === "S") {
      order.paidOrder();
    }
    console.log(
      `Compra ${order.id} - ${order.purchase_date.toLocaleDateString(
        "pt-BR"
      )}\n`
    );
    console.log("Status de pagamento atualizado com sucesso! Volte sempre");

    console.log(`\n`);
  }
}
