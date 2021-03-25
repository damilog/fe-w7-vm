import { _ } from "../util.js";
import Observable from "../Observable.js";
import { data } from "../data.js";

export default class MachineModel extends Observable {
  constructor() {
    super();
    this.totalInputMoney = 0;
    this.totalInputMoneyArr = [];
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

  returnTotalDetail() {
    let moneyTypeArr = [100000,50000, 10000, 5000, 1000, 500, 100, 50, 10]
    for(let i=0; i<moneyTypeArr.length; i++) {
        let idx = {};
        idx.name= moneyTypeArr[i];
        idx.cnt = Math.floor(this.totalInputMoney/moneyTypeArr[i]);
        if(idx.cnt !== 0) {
          this.totalInputMoneyArr.push(idx);
        }
        this.totalInputMoney %= moneyTypeArr[i];
    }
    // console.log(this.totalInputMoney)
    console.log(this.totalInputMoneyArr)
    return this.totalInputMoneyArr
  }
  updateStock(product) {
    this.productState.forEach(x => {
      if (product === x["name"]) x["stock"]--;
    });
  }
  resetTotalMoney() {
    this.totalInputMoney = 0;
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
