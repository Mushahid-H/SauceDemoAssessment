# SauceDemo E2E Test Automation (Playwright + TypeScript)

An end-to-end test for the [SauceDemo](https://www.saucedemo.com) checkout flow, built with Playwright and TypeScript using a small page object structure.

## What it tests

One happy-path purchase as `standard_user`:

Login → Products → Product Details → Add to Cart → Cart → Checkout: Your Information → Checkout: Overview → Finish → Order completion

Each step ends with an assertion, so a failure points to the exact step. Checks include:

- The URL and page title are correct after each navigation
- The cart badge shows `1` after adding the product
- The correct product appears in the cart and on the order overview
- The confirmation message "Thank you for your order!" is shown at the end

## Project structure

```
SauceDemo/
├── Pages/                  # Page objects
│   ├── LoginPage.ts
│   ├── InventoryPage.ts    # Products list and Product Details
│   ├── CartPage.ts
│   └── CheckoutPage.ts     # Your Information, Overview, Finish
├── tests/
│   └── checkout.spec.ts    # The end-to-end test
├── test-data/
│   └── data.ts             # Credentials, product name, checkout details
├── playwright.config.ts
└── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org) 18 or later
- npm

## Setup

```bash
git clone <your-repo-url>
cd SauceDemo
npm install
npx playwright install
```

## Running the tests

```bash
# Run headless
npx playwright test

# Run with a visible browser
npx playwright test --headed

# Run repeatedly to check for flakiness
npx playwright test --repeat-each=20

# Open the HTML report
npx playwright show-report
```

## Design decisions

- **No hard-coded waits.** The test relies on Playwright's auto-waiting and web-first assertions (`expect(...).toHaveText`, `toBeVisible`, `toHaveURL`).
- **Stable selectors.** SauceDemo exposes `data-test` attributes, so the config sets `testIdAttribute: 'data-test'` and locators use `getByTestId`.
- **Simple page objects.** Four small classes, one per area of the flow, with no extra abstraction layers.
- **Test data kept separate.** Credentials, the product name and checkout details live in `test-data/data.ts`, not in the test code.
- **Waiting for the right page.** After opening a product, the test waits for the details page's "Add to cart" button before asserting the product name. The URL changes slightly before the new view renders, so asserting immediately matched all six products on the list page and made the test flaky. Waiting for a page-specific element fixed it (verified with 20 consecutive passing runs).

## Limitations

- Covers a single happy path with `standard_user` only
- Runs on Chromium only
- No negative scenarios yet (locked-out user, wrong password, missing checkout fields)

## Possible next steps

- Negative tests for login and checkout form validation
- Other SauceDemo users (e.g. `problem_user`) and additional browsers
- Multiple products in the cart and total price verification
- CI pipeline (e.g. GitHub Actions) to run the suite on every push

## Notes

The credentials in `test-data/data.ts` are the public demo credentials published on the SauceDemo login page, so there is nothing sensitive in this repository.