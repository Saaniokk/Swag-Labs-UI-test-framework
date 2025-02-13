import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage {

  // CheckoutPage locators
  public checkoutOverview: Locator = this._page.locator("//div[@class='header_secondary_container']");
  public finishButton: Locator = this._page.locator("#finish");
  public checkoutCompleteContainer: Locator = this._page.locator("#checkout_complete_container");
  public thankYouBox: Locator = this._page.locator("//h2[@data-test='complete-header']");

  // CheckoutPage methods
  public async clickFinishButton(): Promise<void> {
    await this.finishButton.scrollIntoViewIfNeeded();
    await this.finishButton.click();
  }

}
