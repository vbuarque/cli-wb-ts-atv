export class Service {
  readonly id: number;
  public name: string;
  public price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  public set update(payload: { price: number }) {
    this.price = payload.price;
  }
}
