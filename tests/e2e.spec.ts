import { Urls } from "../utils/urls.enum.ts";
import { test } from "./fixtures/base.fixture.ts";
import { expect } from "@playwright/test";
import { completeLogin } from "./steps/sharedSteps.step.ts";

test.describe("Flow for Purchasing", () => {
  test.beforeEach(async ({ loginPage }) => {
    await completeLogin(loginPage);
  });
  test("Flow for a successful Purchase", async ({ productPage,cartPage, checkoutPage, faker,}) => {
    test.info().annotations.push({ type: "TestCaseID", description: "4" });
    const currentUrlAfterLogin = await productPage.url();
    expect(currentUrlAfterLogin).toBe(Urls.ProductPage);
    // Add product to cart and steps for successful purchase
    await productPage.addToCartBackpack();
    const cartItemsValue = await productPage.shoppingCartBadge.innerText();
    expect(cartItemsValue).toEqual("1");
    await productPage.getHeader().clickOnCartIcon();
    await cartPage.clickCheckoutButton();
    await expect(cartPage.checkoutForm).toBeVisible();
    // Fill information in Checkout Form
    const lastName = faker.person.lastName();
    const firstName = faker.person.firstName();
    const zipCode = faker.location.zipCode();
    await cartPage.fillInformation(firstName, lastName, zipCode);
    await expect.soft(cartPage.firstNameField).toHaveValue(firstName);
    await expect.soft(cartPage.lastNameField).toHaveValue(lastName);
    await expect.soft(cartPage.zipCodeField).toHaveValue(zipCode);
    await cartPage.clickContinueButton();
    // Validate checkout overview page and validate attributes
    const newPageUrl = await checkoutPage.url();
    expect.soft(newPageUrl).toEqual(Urls.CheckoutTwo);
    await expect.soft(checkoutPage.checkoutOverview).toBeVisible();
    await checkoutPage.clickFinishButton();
    const nextPageUrl = await checkoutPage.url();
    expect.soft(nextPageUrl).toEqual(Urls.CheckoutComplete);
    await expect.soft(checkoutPage.checkoutCompleteContainer).toBeVisible();
    await expect.soft(checkoutPage.thankYouBox).toHaveText("Thank you for your order!");
  });
});
