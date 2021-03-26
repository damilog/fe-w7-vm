import { _ } from "../util.js";
import Observable from "../Observable.js";
import { data } from "../data.js";

export default class WalletModel extends Observable {
  constructor() {
    super();
    this.totalMoneyDatail = [];
    // 지갑 금액 정보
    this.moneyState = data["money"];
  }

  // 지갑의 데이터의 금액 수량 카운터를 빼준다.
  updateMoney(moneyType) {
    this.moneyState.forEach(money => {
      if (money["name"] === moneyType && money["count"]) money["count"]--;
    });
    this.notify(moneyType);
  }

  //현재의 지갑 데이터를 반환
  getMoneyState() {
    return this.moneyState;
  }

  //해당 금액의 카운더를 반환한다. 
  getMoneyCount(moneyType) {
    let count;

    this.moneyState.forEach(money => {
      if (money["name"] === moneyType && money["count"] >= 0) {
        count = money["count"];
      }
    });
    return count;
  }
  returnTotalMoney(total) {
    this.totalMoneyDatail = total;
    console.log(this.totalMoneyDatail)
  }
  // 금액 총액을 계산한다. 
  calculateTotalMoney() {
    return this.moneyState.reduce((acc, money) => {
      return acc + money["name"] * money["count"];
    }, 0);
  }
}