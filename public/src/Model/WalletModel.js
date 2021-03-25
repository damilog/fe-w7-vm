import { _ } from "../util.js";
import Observable from "../Observable.js";
import { data } from "../data.js";

export default class WalletModel extends Observable {
  constructor() {
    super();
    this.returnDetailMoney = [];
    this.moneyState = data["money"];
  }

  updateMoney(moneyType) {
    this.moneyState.forEach(money => {
      if (money["name"] === moneyType && money["count"]) money["count"]--;
    });
    const state = {state:"input", money:moneyType};
    this.notify(state,moneyType);//객체로 전달 ?
  }

  getMoneyState() {
    return this.moneyState;
  }
  updateMoneyState() {
    this.returnDetailMoney.forEach(e => {
      e.name
    })
  }
  returnTotalMoney(total) {
    this.returnDetailMoney = total;

    //this.moneyState 를 return 받은 값으로 업데이트 된상태에서
    //this.notify(moneyList);//객체로 전달 ?
    // this.check 옵저버  리셋?
    const state = {state:"return", money: total};
    //this.notify(state,total);

  }
  getMoneyCount(moneyType) {
    let count;

    this.moneyState.forEach(money => {
      if (money["name"] === moneyType && money["count"] >= 0) {
        count = money["count"];
      }
    });
    return count;
  }

  calculateTotalMoney() {
    return this.moneyState.reduce((acc, money) => {
      return acc + money["name"] * money["count"];
    }, 0);
  }
}
