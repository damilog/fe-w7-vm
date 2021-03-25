import { _ } from "../util.js";
import { data } from "../data.js";

export default class ProductView {
  constructor(model) {
    this.model = model;
    this.init();
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
  updateProduct(event) {
    //console.log(event.target.className);
    if (
      event.target.className !==
      "product-view__drink-bundle__list__name selectable"
    )
      return;
    const clickedProduct = event.target.innerText;
  }

  init() {
    this.renderInitView();
    _.$(".product-view__drink-bundle").addEventListener(
      "click",
      this.updateProduct.bind(this)
    );
  }
}
