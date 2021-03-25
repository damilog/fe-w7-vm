import { _ } from "../util.js";
import Observable from "../Observable.js";
import { data } from "../data.js";

export default class MachineModel extends Observable {
  constructor() {
    super();
    this.totalInputMoney = 0;
    this.productState = data["product"];
    this.currentProduct;
  }

  getSelectableProduct() {
    const selectableProduct = [];
    this.productState.forEach(product => {
      if (product["price"] <= this.totalInputMoney)
        selectableProduct.push(product["name"]);
    });

    return selectableProduct;
  }

  isInStock(product) {
    let stock;
    this.productState.forEach(x => {
      if (product === x["name"]) stock = x["stock"];
    });
    return stock > 0;
  }

  reduceStock(product) {
    this.productState.forEach(x => {
      if (product === x["name"]) x["stock"]--;
    });
  }

  updateMachineState(state) {
    this.notify(state);
  }

  setOverBudgetError() {
    const state = { action: "overBudget", data: this.totalInputMoney };
    this.updateMachineState(state);
  }

  async updateSelectedProduct(product) {
    const state = { action: "select", data: product };
    await _.delay(2000);
    this.updateMachineState(state);
  }

  reduceTotalMoney(moneyType) {
    this.totalInputMoney -= moneyType;
  }

  addTotalMoney(moneyType) {
    this.totalInputMoney += moneyType;
    const state = { action: "input", data: moneyType };

    this.updateMachineState(state);
  }

  getTotalInputMoney() {
    return this.totalInputMoney;
  }

  getProductPrice(product) {
    let price;
    this.productState.forEach(x => {
      if (product === x["name"]) price = x["price"];
    });
    return price;
  }

  getProductStock(product) {
    let stock;
    this.productState.forEach(x => {
      if (product === x["name"]) stock = x["stock"];
    });
    return stock;
  }
}
