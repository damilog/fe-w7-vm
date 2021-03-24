import { _ } from "../util.js";
import Observable from "../Observable.js";

export default class MachineModel extends Observable {
  constructor() {
    super();
    this.totalInputMoney = 0;
    this.init();
  }

  updateTotalMoney(moneyType) {
    this.totalInputMoney += moneyType;
  }

  getTotalInputMoney() {
    return this.totalInputMoney;
  }
  init() {}
}
