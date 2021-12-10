import { Product, Service } from "./index";

export class Order {
  readonly id: number;
  readonly client_id: number;
  readonly purchase_date: Date;
  public status_order: string;
  public order_amount: number;

  readonly seller_id: number;
  readonly seller_commission: number;

  readonly productList?: Array<{ product: Product; unit: number }>;
  readonly serviceList?: Array<{ service: Service; unit: number }>;

  constructor(
    id: number,
    client_id: number,
    purchase_date: Date,
    status_order: string,
    seller_id: number,
    seller_commission: number,
    productList?: Array<{ product: Product; unit: number }>,
    serviceList?: Array<{ service: Service; unit: number }>
  ) {
    this.id = id;
    this.client_id = client_id;
    this.purchase_date = purchase_date;
    this.status_order = status_order;

    this.seller_id = seller_id;
    this.seller_commission = seller_commission;
    this.productList = productList;
    this.serviceList = serviceList;
    this.order_amount = 0;
    this.handleOrderAmount();
  }

  handleOrderAmount() {
    this.productList?.forEach(({ product, unit }) => {
      this.order_amount += product.price * unit;
    });

    this.serviceList?.forEach(({ service, unit }) => {
      this.order_amount += service.price * unit;
    });
  }

  paidOrder() {
    this.status_order = "paid";
  }
}

// Carrinho de compra

// - Id
// - id do cliente
// - dia da compra
// - Status pagamento
// - Valor total

// - Comissão ?
// - id vendedor/ funcionario

// - Produtos
// 	- id produto
// 	- quantidade
// 	- unidade
// - Serviços
// 	- id serviço
// 	- criar um contador p/ numero de serviços executados
// - Pagamento
//  	- Forma de pagamento ("credito" "débito" "pix" "dinheiro")
// type Direction = 'up' | 'down' | 'left' | 'right';
// 	- Valor para pagamento
// 	- mudar status de pagamento
// - Remover Produto/Serviço
// 	- Id produto/Serviço
// 	- diminuir valor total
// 	-
