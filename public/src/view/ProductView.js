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

  updateProduct(event) {
    if (
      event.target.className !==
      "product-view__drink-bundle__list__name selectable"
    )
      return;

    const clickedProduct = event.target.innerText;
    const clickedProductPrice = this.model.getProductPrice(clickedProduct);

    this.checkCurrentStock(clickedProduct);
  }

  renderInitView() {
    const $productContainer = _.$(".product-view");
    const innerTemplate = this.makeProductViewTemplate(data["product"]);
    const template = `<ul class="product-view__drink-bundle">${innerTemplate}</ul>`;
    $productContainer.innerHTML = template;
  }

  paintSelectable() {
    // 선택 가능한 품목 실시간 업데이트(색깔 입힘)
    const selectableProductList = this.model.getSelectableProduct();
    const $products = _.$All(".product-view__drink-bundle__list__name");
    $products.forEach(x => {
      if (selectableProductList.includes(x.innerText)) {
        _.add(x, "selectable");
      } else {
        if (_.contains(x, "selectable")) {
          _.remove(x, "selectable");
        }
      }
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
      this.checkCurrentTotalMoney(clickedProduct);
    } else {
      alert(`${clickedProduct}는 품절된 상품입니다.`);
    }
  }

  checkCurrentTotalMoney(clickedProduct) {
    const clickedProductPrice = this.model.getProductPrice(clickedProduct);
    const currentTotalMoney = this.model.getTotalInputMoney();

    if (currentTotalMoney < clickedProductPrice) {
      this.model.setOverBudgetError(); // 예산이 부족한 경우
    } else {
      this.model.reduceStock(clickedProduct);
      this.model.reduceTotalMoney(clickedProductPrice);
      this.model.updateSelectedProduct(clickedProduct);
    }
  }
}
