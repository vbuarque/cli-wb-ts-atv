export class Phone {
  private ddd: number;
  private number: number;

  constructor(ddd: number, number: number) {
    this.ddd = ddd;
    this.number = number;
  }

  public get getDdd(): number {
    return this.ddd;
  }

  public setDDD(ddd: number) {
    this.ddd = ddd;
  }

  public get getNumber(): number {
    return this.number;
  }

  public setNumber(number: number) {
    this.number = number;
  }

  public getFullNumber() {
    return `(${this.ddd}) ${this.number}`;
  }
}
