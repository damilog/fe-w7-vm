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

  updateStock(product) {
    this.productState.forEach(x => {
      if (product === x["name"]) x["stock"]--;
    });
    console.log(this.productState);
  }

  getOverBudgetError() {
    const state = { action: "overBudget", data: this.totalInputMoney };
    this.updateMachineState(state);
  }

  updateCurrentProduct(product) {
    this.currentProduct = product;
    const state = { action: "select", data: product };

    this.updateMachineState(state);
  }

  updateTotalMoney(moneyType) {
    this.totalInputMoney += moneyType;
    const state = { action: "input", data: moneyType };

    this.updateMachineState(state);
  }
  updateMachineState(state) {
    this.notify(state);
  }

  getTotalInputMoney() {
    return this.totalInputMoney;
  }
}
