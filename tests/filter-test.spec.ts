import { test, expect, Browser, Page, BrowserContext } from '@playwright/test';
import { chromium } from 'playwright';
import { BrowserWrapper } from '../infra/browserWrapper';

test.describe('My Test Suite', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  test.beforeEach(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    page.setDefaultTimeout(45000);
    await page.goto('https://www.tase.co.il/he/market_data/securities/data/stocks');
    const cookiesButton = page.getByText('אני מאשר/ת');
    await cookiesButton.click();
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('sort ascending stock price', async () => {
    const button = page.getByLabel('מיון בסדר עולה לפי שער בסיס');
    await button.click();
    const text = await button.getAttribute('aria-pressed');
    expect(text).toBeTruthy();
  });

  test('filter by niarot erekh rashi', async()=>{
    const filterBy = page.locator('//select[@aria-labelledby="labelFilterBy"]');
    const firstFilter = filterBy.nth(0);
    await firstFilter.selectOption('ניירות ערך');
    const secondFilter = filterBy.nth(1);
    await secondFilter.selectOption('רשימה ראשית')
    const filterButton = page.locator('//*[@id="mainContent"]/securities-lobby/securities-table/gridview-lib/div/div[2]/div/div[2]/div[2]/div/div[7]/button[1]');
    await filterButton.click();
    await page.waitForLoadState();
    const table = page.locator('//tbody//tr').nth(0).locator('//td').nth(0);
    const firstRow = await table.innerText();
    expect (firstRow).toContain('אאורה');
  });

  test('filter by mnaiot rgelot', async()=>{
    const filterBy = page.locator('//select[@aria-labelledby="labelFilterBy"]');
    const firstFilter = filterBy.nth(0);
    await firstFilter.selectOption('מניות');
    const secondFilter = filterBy.nth(1);
    await secondFilter.selectOption('מניה רגילה');
    const filterButton = page.locator('//*[@id="mainContent"]/securities-lobby/securities-table/gridview-lib/div/div[2]/div/div[2]/div[2]/div/div[7]/button[1]');
    await filterButton.click();
    await page.waitForLoadState();
    const table = page.locator('//tbody//tr').nth(0).locator('//td').nth(0);
    const firstRow = await table.innerText();
    const numberOfRows = page.getByText('רשמות');
    expect (firstRow).toContain('אאורה');
   await expect (numberOfRows).toContainText('502');
  });
  
});
