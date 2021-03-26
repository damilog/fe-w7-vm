import { _ } from "../util.js";
import Observable from "../Observable.js";
import { data } from "../data.js";

export default class WalletModel extends Observable {
  constructor() {
    super();
    this.moneyState = data["money"];
    this.totalMoneyDetail = []; //luke
  }

  updateMoney(moneyType) {
    this.moneyState.forEach(money => {
      if (money["name"] === moneyType && money["count"]) money["count"]--;
    });

    this.notify([moneyType]);
  }

  returnMoney() {
    //반환 버튼 눌렀을 때 이걸 실행시켜준다.
    //moneyType = [500, 1000] -> 루크가 반환한 돈 type
    this.notify([...moneyType]);
  }

  getMoneyState() {
    return this.moneyState;
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

  //luke

  returnTotalMoney(total) {
    this.totalMoneyDetail = total;
  }
}
