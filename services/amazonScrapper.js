const puppeteer = require('puppeteer');

const scrapeAmazon = async (url) => {
    try{
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
    
        // Set user agent and other headers
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url, { waitUntil: 'load', timeout: 0 });
    
        // Extract product details
        const result = await page.evaluate(() => {
            const title = document.querySelector('#productTitle')?.textContent.trim();
            const price = document.querySelector('.a-price-whole')?.textContent.trim();
            const image = document.querySelector('#landingImage')?.getAttribute('src');
            const stock = document.querySelector('#availability span')?.textContent.trim(); // Check for stock info
            const description = document.querySelector('#productDescription p span')?.textContent.trim(); // Check for stock info
            return { title, price,image,stock: stock || "In stock",description};
        });
    
        await browser.close();
        return result;
    }catch(error){
        console.log("here is your error",error)
    }
};

module.exports=scrapeAmazon;