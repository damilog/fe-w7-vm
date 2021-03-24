import { _ } from "../util.js";
import Observable from "../Observable.js";
import { data } from "../data.js";

export default class WalletModel extends Observable {
  constructor() {
    super();
    this.moneyState = data["money"];
    this.init();
  }

  updateMoney(moneyType) {
    this.moneyState.forEach(money => {
      if (money["name"] === moneyType && money["count"]) money["count"]--;
    });
    console.log(this.moneyState);
  }

  getMoneyState() {
    return this.moneyState;
  }

  // 500
  getMoneyCount(moneyType) {
    return this.moneyState.forEach(money => {
      if (money["name"] === moneyType && money["count"]) return money["count"];
    });
  }

  calculateTotalMoney() {
    return this.moneyState.reduce((acc, money) => {
      return acc + money["name"] * money["count"];
    }, 0);
  }

  init() {}
}
