import { _ } from "../util.js";
import Observable from "../Observable.js";

export default class MachineModel extends Observable {
  constructor() {
    super();
    this.totalInputMoney = 0;
    this.init();
  }

  updateMachineState(state) {
    this.notify(state);
  }

  updateTotalMoney(moneyType) {
    this.totalInputMoney += moneyType;
    const state = { action: "input", data: moneyType };
    this.updateMachineState(state);
  }

  getTotalInputMoney() {
    return this.totalInputMoney;
  }
  init() {}
}
