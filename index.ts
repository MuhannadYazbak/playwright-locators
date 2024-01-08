import { chromium } from 'playwright'; 
(async () => { const browser = await chromium.launch();
   const context = await browser.newContext(); 
   const page = await context.newPage(); 
   await page.goto('https://playwright.dev/'); 
   console.log(await page.title()); 
   await browser.close(); 
})();