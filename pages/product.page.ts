import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductPage extends BasePage {

  // ProductPage locators
  public productsBlock: Locator = this._page.locator( "//span[@data-test='title']");
  public backpackAddToChartButton: Locator = this._page.locator("#add-to-cart-sauce-labs-backpack");
  public shoppingCartBadge: Locator = this._page.locator("//span[@data-test='shopping-cart-badge']");

  // ProductPage methods
  public async addToCartBackpack(): Promise<void> {
    await this.backpackAddToChartButton.click();
  }
}
