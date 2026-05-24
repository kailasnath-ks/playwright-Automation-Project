# Playwright TypeScript Assessment

Automated test suite for [SauceDemo](https://www.saucedemo.com) using **Playwright + TypeScript**.

---

##  Project Structure

```
playwright-assessment/
├── pages/                    # Page Object Models
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CheckoutPage.ts
│   └── ProductPage.ts
├── tests/                    # Test specs
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   ├── checkout.spec.ts
│   ├── navigation.spec.ts
│   └── negative.spec.ts
├── test-data/                # External test data
│   ├── testData.json         # JSON data (users, checkout, negative inputs)
│   └── generateExcel.ts      # Script to generate Excel file
├── utils/
│   └── dataLoader.ts         # JSON data loader utility
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

##  Prerequisites

- **Node.js** v18 or higher → [Download](https://nodejs.org/)
- **npm** v9 or higher (comes with Node)
- **VS Code** (recommended) → [Download](https://code.visualstudio.com/)

---

##  Setup Steps

### 1. Clone or extract the project
```bash
cd playwright-assessment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers
```bash
npx playwright install chromium
```

---

##  Running Tests

| Command | Description |
|---|---|
| `npx playwright test` | Run all 38 tests (headless) |
| `npx playwright test --headed` | Run with browser visible |
| `npx playwright test --ui` | Open Playwright UI mode |
| `npx playwright test --grep @smoke` | Run only smoke tests |
| `npx playwright test --grep @regression` | Run only regression tests |
| `npx playwright show-report` | Open last HTML test report |

### Run a single file
```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/checkout.spec.ts
```

---

## 📊 Test Coverage — 38 Tests Total

| Spec File | Category | Tags | Count |
|---|---|---|---|
| `login.spec.ts` | Valid login, invalid login, page navigation | @smoke @regression | 7 |
| `inventory.spec.ts` | Sorting, cart operations, product count | @smoke @regression | 8 |
| `checkout.spec.ts` | Form flow, validations, cancel scenarios | @smoke @regression | 8 |
| `navigation.spec.ts` | Product detail, back button, logout | @smoke @regression | 7 |
| `negative.spec.ts` | Security inputs, cart edge cases, login edge cases | @regression | 8 |

---

## 🗂️ Test Data (Data-Driven)

All test inputs are loaded externally from `test-data/testData.json`:

| Data Key | Used In | Description |
|---|---|---|
| `validUsers` | `login.spec.ts` | Valid login credentials |
| `invalidUsers` | `login.spec.ts` | Locked/wrong credentials |
| `checkoutUsers` | `checkout.spec.ts` | Valid checkout form data |
| `invalidCheckout` | `checkout.spec.ts` | Empty/invalid form fields |
| `negativeInputs` | `negative.spec.ts` | SQL injection, XSS, long inputs |
| `products` | `navigation.spec.ts` | Product names and expected prices |

---

## 🏗️ Design Patterns

- **Page Object Model (POM)** — each page has its own class with locators and actions
- **Data-Driven Testing** — tests loop over JSON data, no hardcoded inputs in test files
- **Tagged Tests** — `@smoke` for critical paths, `@regression` for full coverage
- **Helper Functions** — shared login/setup logic to avoid repetition
- **Meaningful Assertions** — every test verifies a specific expected outcome

---

## 🌐 Test Site

All tests run against **https://www.saucedemo.com** — a free public demo e-commerce site.

| Credential | Role |
|---|---|
| `standard_user / secret_sauce` | Main test user |
| `locked_out_user / secret_sauce` | Locked account (negative test) |
| `problem_user / secret_sauce` | Problem account (edge case) |

---

## 📝 Reports

After running tests, an HTML report is auto-generated:
```bash
npx playwright show-report
```
- Screenshots saved on failure → `test-results/`
- Full HTML report → `playwright-report/`