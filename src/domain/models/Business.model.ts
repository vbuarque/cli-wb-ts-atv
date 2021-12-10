import { Client, Product, Service } from "./index";

export default class Business {
  private _clientList: Array<Client>;
  private _productList: Array<Product>;
  private _services: Array<Service>;

  constructor() {
    this._clientList = [];
    this._productList = [];
    this._services = [];
  }

  public get clients() {
    return this._clientList;
  }
  public get products() {
    return this._productList;
  }
  public get services() {
    return this._services;
  }

  public setListClient(clientsUpdated: Array<Client>) {
    this._clientList = clientsUpdated;
  }

  public setListProduct(productUpdated: Array<Product>) {
    this._productList = productUpdated;
  }

  public setListServices(serviceUpdated: Array<Service>) {
    this._services = serviceUpdated;
  }
}
