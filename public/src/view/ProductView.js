import { _ } from "../util.js";
import { data } from "../data.js";

export default class ProductView {
  constructor(model, walletModel) {
    this.model = model;
    this.walletModel = walletModel;
    this.init();
  }

  init() {
    this.renderInitView();
    this.onEvent();
    this.model.subscribe(this.paintSelectable.bind(this));
  }
  onEvent() {
    _.$(".product-view__drink-bundle").addEventListener(
      "click",
      this.updateProduct.bind(this)
    );
  }

  renderInitView() {
    const $productContainer = _.$(".product-view");
    const innerTemplate = this.makeProductViewTemplate(data["product"]);
    const template = `<ul class="product-view__drink-bundle">${innerTemplate}</ul>`;
    $productContainer.innerHTML = template;
  }

  paintSelectable() {
    const selectableProductList = this.model.getSelectableProduct();
    const $products = _.$All(".product-view__drink-bundle__list__name");
    $products.forEach(x => {
      if (selectableProductList.includes(x.innerText)) _.add(x, "selectable");
    });
  }

  paintUnselectable(product) {
    const $products = _.$All(".product-view__drink-bundle__list__name");
    $products.forEach(x => {
      if (product.includes(x.innerText))
        _.replace(x, "selectable", "unseletable");
    });
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

  checkCurrentStock(clickedProduct) {
    if (this.model.isInStock(clickedProduct)) {
      //재고가 있는지? + (total 금액도 확인해야돼)
      this.model.updateCurrentProduct(clickedProduct); // 기존 구독 리스트 제거하고 이걸 구독해야될 것 같음.
      this.model.updateStock(clickedProduct); // 기존 구독 리스트 제거하고 이걸 구독해야될 것 같음.
    } else {
      alert(`${clickedProduct}는 품절된 상품입니다.`);
    }
  }

  checkCurrentTotalMoney(money) {
    const currentTotalMoney = this.model.getTotalInputMoney();
    if (currentTotalMoney < money) {
      this.model.setOverBudgetError();
    } else {
    }
  }

  updateProduct(event) {
    if (
      event.target.className !==
      "product-view__drink-bundle__list__name selectable"
    )
      return;

    const clickedProduct = event.target.innerText;
    this.checkCurrentStock(clickedProduct);
  }
}
