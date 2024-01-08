import { Browser, BrowserContext, Page, chromium } from "playwright";

export class BrowserWrapper{
    private browser: Browser | undefined;
    private context: BrowserContext | undefined;
    private page: Page | undefined;
    

    async getPage(url: string): Promise<Page> {
        this.browser = await chromium.launch();
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
        await this.page.goto(url);
        return this.page;
    }

    async closeBrowser(){
        await this.browser?.close();
    }
}