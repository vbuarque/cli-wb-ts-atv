import { Order } from "./Order.model";
import { People } from "./People.model";
import * as SharedModel from "../shared/models";

export class Client extends People {
  readonly id: number;
  private email: string;
  readonly registeredDay: Date;
  readonly phones: SharedModel.Phone[];

  private _orders: Array<Order>;

  constructor(
    id: number,
    email: string,
    name: string,
    CPF: string,
    birthDate: Date,
    gender: string,
    phones: SharedModel.Phone[]
  ) {
    super(name, CPF, birthDate, gender);
    this.id = id;
    this.email = email;
    this.phones = phones;
    this.registeredDay = new Date();
    this._orders = [];
  }

  public set updateInfo(info: any) {
    this.email = info.email;
    this.name = info.name;
  }

  public get orders() {
    return this._orders;
  }

  public set orders(order: Order[]) {
    this._orders = order;
  }

  public setListOrder(ordersUpdated: Array<Order>) {
    this._orders = ordersUpdated;
  }
}
