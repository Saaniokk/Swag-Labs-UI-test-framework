import { Urls } from "../utils/urls.enum";
import { test } from "./fixtures/base.fixture.ts";
import { expect } from "@playwright/test";

const properUsername = "standard_user";
const properPassword = "secret_sauce";

test.describe("Login Checks", () => {
  // Go to Login  page for each of tests in describe
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto(Urls.LoginPage, { waitUntil: "load" });
  });

  // Block of separate tests
  test("Successful Login with Valid Credentials", async ({
    loginPage,
    productPage,
  }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "1" });
    await loginPage.fillLoginForm(properUsername, properPassword);
    await loginPage.clickLoginButton();
    // Validate if proper url opened after click
    const currentUrl = await productPage.url();
    await expect.soft(currentUrl).toBe(Urls.ProductPage);
    await expect(productPage.productsBlock).toBeVisible();
  });

  test("Error Message for Invalid Credentials", async ({ loginPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "2" });
    const invalidUsername = "Awoqis1dak";
    const invalidPassword = "312312das";
    // Fill login values with incorrect credits and click button
    await loginPage.fillLoginForm(invalidUsername, invalidPassword);
    await loginPage.clickLoginButton();
    // Validate error attributes are displayed
    await expect.soft(loginPage.redXButton.nth(0)).toBeVisible();
    await expect.soft(loginPage.redXButton.nth(1)).toBeVisible();
    await expect.soft(loginPage.errorBox).toBeVisible();
    await expect
      .soft(loginPage.errorBox)
      .toHaveText(
        "Epic sadface: Username and password do not match any user in this service",
      );
  });

  test("Password Input Masking", async ({ loginPage }) => {
    test.info().annotations.push({ type: "TestCaseID", description: "3" });
    await loginPage.fillLoginForm(properUsername, properPassword);
    await expect(loginPage.PasswordField).toHaveAttribute("type", "password");
  });
});
