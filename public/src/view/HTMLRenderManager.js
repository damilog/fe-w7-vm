import { _ } from "../util.js";
import { data } from "../data.js";

export default class HTMLRenderManager {
  constructor() {
    this.init();
  }

  renderWalletView() {
    const $walletContainer = _.$(".wallet-view");
    const innerTemplate = this.makeWalletViewTemplate(data["money"]);
    const template = `<ul class="wallet-view__cash-bundle">${innerTemplate}</ul><div class="wallet-view__cash-bundle__total-price">23550</div>`;
    $walletContainer.innerHTML = template;
  }
  makeWalletViewTemplate(moneyList) {
    const money = moneyList;
    return money.reduce((acc, money) => {
      return (
        acc +
        `<li>
      <input
        type="button"
        value="${money["name"]}원"
        class="wallet-view__cash-bundle__price"
      />
      <div class="wallet-view__cash-bundle__cnt">${money["count"]}개</div>
    </li>`
      );
    }, "");
  }
  renderProductView() {
    const $productContainer = _.$(".product-view");
    const innerTemplate = this.makeProductViewTemplate(data["product"]);
    const template = `<ul class="product-view__drink-bundle">${innerTemplate}</ul>`;
    $productContainer.innerHTML = template;
  }

  makeProductViewTemplate(productList) {
    const product = productList;
    return product.reduce((acc, product) => {
      return (
        acc +
        `<li class="product-view__drink-bundle__list">
      <span class="product-view__drink-bundle__list__name">${product["name"]}</span>
      <span class="product-view__drink-bundle__list__price">${product["price"]}원</span>
    </li>`
      );
    }, "");
  }
  renderStateView() {
    const $stateContainer = _.$(".state-view");
    const template = `<div class="state-view__price"></div>
    <input
      type="button"
      class="state-view__btn"
      value="반환"
      disabled="disabled"
    />
    <div class="state-view__state"></div>`;
    $stateContainer.innerHTML = template;
  }

  init() {
    this.renderProductView();
    this.renderStateView();
    this.renderWalletView();
  }
}
