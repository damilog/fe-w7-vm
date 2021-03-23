import Observable from "./Observable.js";
import { _, delay } from "./util.js";
import WalletView from "./view/WalletView.js";
//observable
const source$ = new Observable();
const $walletViewCoin = _.$(".wallet-view__cash-bundle__price");

const walletView = new WalletView($walletViewCoin);
console.log(document.querySelector(".wallet-view__cash-bundle__price"));
console.log(document.querySelector(".wallet-view__cash-bundle__cnt"));
//walletView.init();

console.log(344);
