import { BusinessModel, Product } from "../models";
import { Input, findProduct } from "../shared/utils";

export class ProductController {
  private input: Input;
  private business: BusinessModel;
  private productList: Array<Product>;

  constructor(business: BusinessModel) {
    this.input = new Input();
    this.business = business;
    this.productList = business.products;
  }

  actionsProduct() {
    console.log(
      `\n
      Opções de Produto:
      1 - Cadastrar produto
      2 - Catálogo de produto
      3 - Buscar produto
      4 - Atualizar produto
      5 - Remover produto 
      0 - Voltar ao menu principal \n
    `
    );

    let productOption = this.input.number(`Por favor, escolha uma opção: `);

    switch (productOption) {
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

  generatingProductCode() {
    if (this.productList.length > 0) {
      const lastProductCode = this.productList[this.productList.length - 1];
      let productCode = lastProductCode?.id;
      if (!productCode) return 1;
      return productCode + 1;
    }
    return 0;
  }

  public create(): void {
    console.log("\nInício do cadastro do produto");

    const name = this.input.text(`Nome: `);
    const price = this.input.number(`Preço: `);
    const amount = this.input.number(`Quantidade: `);
    const productCode: number = this.generatingProductCode();
    const product = new Product(productCode, name, price, amount);

    this.productList.push(product);
    console.log("\nCadastro concluído :)\n");
  }

  public index(): void {
    console.log(`\nLista de produtos:`);
    this.productList.forEach((product) => {
      console.log(`
      Código do produto: ${product.id}
      Nome: ${product.name}
      Preço: R$ ${product.price}
      Quantidade: ${product.amount}
      --------------------------------------`);
    });
    console.log(`\n`);
  }

  public show(): void {
    const product: Product = findProduct(this.productList);
    console.log(`
    Nome: ${product.name}
    Preço: R$ ${product.price}
    Quantidade: ${product.amount}
    --------------------------------------`);
    console.log(`\n`);
  }

  public put(): void {
    const product: Product = findProduct(this.productList);
    let price = this.input.number(`Atualizar preço do produto: `);
    let amount = this.input.number(`Atualizar quantidade: `);
    const payload = { amount, price };
    product.update = payload;
    console.log(`\n`);
  }

  public delete(): void {
    const product: Product = findProduct(this.productList);

    const productListUpdated = this.productList.filter(
      (productRemoving: Product) => {
        return productRemoving.id !== product.id;
      }
    );

    this.business.setListProduct(productListUpdated);
    console.log(`\n`);
  }
}
