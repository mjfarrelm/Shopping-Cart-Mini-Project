import items from "./items.json";
import { addToCart } from "./shoppingCart.js";
import formatCurrency from "./util/formatCurrency.js";
import addGlobalEventListener from "./util/addGlobalEventListener.js";

const storeItemTemplate = document.querySelector("#store-item-template");
const storeItemContainer = document.querySelector("[data-store-container]");
const IMAGE_URL = "https://dummyimage.com/420x260";

export function populateStore() {
  if (storeItemContainer == null) return;

  addGlobalEventListener("click", "[data-add-to-cart-button]", (e) => {
    const id = e.target.closest("[data-store-item]").dataset.itemId;
    addToCart(parseInt(id));
  });

  items.forEach(renderStoreProduct);
}

function renderStoreProduct(item) {
  const storeItem = storeItemTemplate.content.cloneNode(true);

  const container = storeItem.querySelector("[data-store-item]");
  container.dataset.itemId = item.id;

  const name = storeItem.querySelector("[data-name]");
  name.innerText = item.name;

  const category = storeItem.querySelector("[data-category]");
  category.innerText = item.category;

  const image = storeItem.querySelector("[data-image]");
  image.src = `${IMAGE_URL}/${item.imageColour}/${item.imageColour}`;

  const price = storeItem.querySelector("[data-price]");

  price.innerText = formatCurrency(item.priceCents / 100);

  storeItemContainer.appendChild(storeItem);
}
