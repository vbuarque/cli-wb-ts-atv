export class Product {
  readonly id: number;
  public name: string;
  public price: number;
  public amount: number;

  constructor(id: number, name: string, price: number, amount: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
  }

  public set update(payload: { price: number; amount: number }) {
    this.amount = payload.amount;
    this.price = payload.price;
  }
}
