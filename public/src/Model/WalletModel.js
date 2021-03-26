import { _ } from "../util.js";
import Observable from "../Observable.js";
import { data } from "../data.js";

export default class WalletModel extends Observable {
  constructor() {
    super();
    this.moneyState = data["money"];
    this.totalMoneyDetail = []; //luke
    this.returnMoneyList;
  }
  ///--luke--//
  resetMoneyState() {
    //2번째 반환부터 언디파인드 뜸
    this.returnMoneyList = this.totalMoneyDetail
      .filter(e => e.count > 0)
      .map(e => e.name);

    // 잔돈 돈 cnt
    const changeCnt = this.totalMoneyDetail.map(e => e.count);
    // 현재 돈 cnt
    const currentCnt = this.moneyState.map(e => e.count);
    const resultCnt = [];
    const moneyTypeArr = [100000, 50000, 10000, 5000, 1000, 500, 100, 50, 10];
    const newArr = [];
    for (let i = 0; i < changeCnt.length; i++) {
      resultCnt.push(currentCnt[i] + changeCnt[i]);
      let idx = {};
      idx.name = moneyTypeArr[moneyTypeArr.length - 1 - i];
      idx.count = resultCnt[i];
      newArr.push(idx);
    }
    this.moneyState = newArr;
    this.returnMoney();
  }

  returnMoney() {
    //const state
    this.notify(this.returnMoneyList);
  }
  //

  updateMoney(moneyType) {
    this.moneyState.forEach(money => {
      if (money["name"] === moneyType && money["count"]) money["count"]--;
    });

    this.notify([moneyType]);
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
