import * as fs from 'fs';
import * as path from 'path';

export function loadJSON<T = unknown>(relativePath: string): T {
  const fullPath = path.resolve(__dirname, '..', relativePath);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw) as T;
}

export interface UserData {
  username: string;
  password: string;
  role?: string;
  expectedTitle?: string;
  expectedError?: string;
  scenario?: string;
}

export interface CheckoutData {
  firstName: string;
  lastName: string;
  zipCode: string;
  scenario: string;
  expectedError?: string;
}

export interface NegativeInput {
  username: string;
  password: string;
  expectedError: string;
  scenario: string;
}

export interface ProductData {
  name: string;
  expectedPrice: string;
}

export const getValidUsers = (): UserData[] =>
  loadJSON<{ validUsers: UserData[] }>('test-data/testData.json').validUsers;

export const getInvalidUsers = (): UserData[] =>
  loadJSON<{ invalidUsers: UserData[] }>('test-data/testData.json').invalidUsers;

export const getCheckoutUsers = (): CheckoutData[] =>
  loadJSON<{ checkoutUsers: CheckoutData[] }>('test-data/testData.json').checkoutUsers;

export const getInvalidCheckout = (): CheckoutData[] =>
  loadJSON<{ invalidCheckout: CheckoutData[] }>('test-data/testData.json').invalidCheckout;

export const getNegativeInputs = (): NegativeInput[] =>
  loadJSON<{ negativeInputs: NegativeInput[] }>('test-data/testData.json').negativeInputs;

export const getProducts = (): ProductData[] =>
  loadJSON<{ products: ProductData[] }>('test-data/testData.json').products;


// testData.json
//       ↓
// dataLoader.ts (reads JSON, gives typed data)
//       ↓
// tests/login.spec.ts (loops over users, runs tests)
//       ↓
// pages/LoginPage.ts (knows how to interact with login page)
//       ↓
// playwright.config.ts (tells Playwright where to run and how)
//       ↓
// Result: PASS  or FAIL 