export default class WalletView {
  constructor($walletViewCoin) {
    this.$walletViewCoin = $walletViewCoin;
  }

  updateMoney(event) {
    console.log(event.target);
  }

  init() {
    this.$walletViewCoin.addEventListener("click", this.updateMoney.bind(this));
  }
}
