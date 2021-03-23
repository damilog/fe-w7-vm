import { _ } from "../util.js";
import Observable from "../Observable.js";

export default class WalletModel extends Observable {
  constructor($walletViewCoin, $walletViewCoinBundle) {
    super();
    this.$walletViewCoin = $walletViewCoin;
    this.$coinBundle = $walletViewCoinBundle;
    this.init();
  }
  updateMoney(event) {
    console.log(event.target.value);
    const currentCoin = event.target.value;
    const stateView = new StateView();
    stateView.drawUpdateTotalCoin(currentCoin);
  }

  init() {}
}
