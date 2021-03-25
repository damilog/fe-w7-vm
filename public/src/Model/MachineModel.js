import { _ } from "../util.js";
import Observable from "../Observable.js";
import { data } from "../data.js";

export default class MachineModel extends Observable {
  constructor() {
    super();
    this.totalInputMoney = 0;
    this.productState = data["product"];
  }

  getSelectableProduct() {
    const selectableProduct = [];
    this.productState.forEach(product => {
      if (product["price"] <= this.totalInputMoney)
        selectableProduct.push(product["name"]);
    });

    return selectableProduct;
  }
  updateStock(product) {
    this.productState.forEach(x => {
      if (product === x["name"]) x["stock"]--;
    });
  }

  updateMachineState(state) {
    this.notify(state);
    //this.getSelectableProduct();
  }

  updateTotalMoney(moneyType) {
    this.totalInputMoney += moneyType;
    const state = { action: "input", data: moneyType };
    this.updateMachineState(state);
  }

  getTotalInputMoney() {
    return this.totalInputMoney;
  }
}
