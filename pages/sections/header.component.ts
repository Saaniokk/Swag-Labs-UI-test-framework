import { Locator, Page } from "@playwright/test";

export class Header {
  protected readonly _page: Page;

  //Locators (Declared but not initialized here)
  public readonly cartIcon: Locator;

  public constructor(_page: Page) {
    this._page = _page;

    // Initialize locators inside the constructor
    this.cartIcon = this._page.locator("//a[@data-test='shopping-cart-link']");
  }

  public async clickOnCartIcon(): Promise<void> {
    await this.cartIcon.click();
  }
}
