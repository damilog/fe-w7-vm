import { _ } from "../util.js";

export default class WalletView {
  constructor() {
    this.init();
  }

  drawCurrentWallet(event) {
    const currentMoney = event.target.value;
    this.stateView.drawUpdateTotalCoin(currentMoney);
  }

  init() {}
}
