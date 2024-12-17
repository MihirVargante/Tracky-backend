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

    const scrapeFlipkart = async (url) => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Set user agent and other headers
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url, { waitUntil: 'load', timeout: 0 });

        // Extract product price from Flipkart using the provided classes
        const result = await page.evaluate(() => {
            try{
                const price = document.querySelector('.Nx9bqj.CxhGGd')?.textContent.trim();  // Using the classes you provided
                const title = document.querySelector('.VU-ZEz')?.textContent.trim();  // Using the classes you provided
                const images = document.querySelectorAll('img');
                const image = images.length > 1 ? images[2].getAttribute('src') : null;
                const firstDiv = document.querySelector('._4gvKMe > div');
                const description = firstDiv ? firstDiv.textContent.trim() : null;
                const stock='In Stock'
                return { title,price,image,stock,description};
            }catch(error){
                console.log("here is your error--->",error)
            }
        });

        await browser.close();
        return result;
    };
    // (async () => {
    //     const amznurl = "https://www.amazon.in/Reebok-RMSORA1866-DYANMIC-M-Black/dp/B0D6N3ZMGV/ref=sr_1_22_sspa?crid=3A47AKSE7JWEV&dib=eyJ2IjoiMSJ9.tIWvW2jH-3_-q2DBT0VxjOFF_PN7K0q8o2yW_BkTdqH_D42j45vi3WkdIF7BqKN2SrI8JYP9pamJaHRMDoqOJdgQmJGUFvXDxTk1QOhAA6MhY2jChReuA2X5GcSO_KhQ23bhzpeMDflsS3NXd2JnAR1GzBx7_qtkap32Ewf_q1iJ4GCTMLzIAQQm2cfs4DSEtksKtfM4wWabRDTAA74nHmas5EaIYeyYrV3oMHQYYNZ5AguBpD_Ekka2gIpqhkm_cH_GbjXgTAvCln8Z9lY202dpKXPOovn-lmf4j23pIws.d-HqWrcAVhF6BaUFZ4a8_hvx_z0Ec6o_0hqLBt-K_UI&dib_tag=se&keywords=nike+shoes&nsdOptOutParam=true&qid=1734116458&sprefix=nike+shoe%2Caps%2C201&sr=8-22-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&psc=1";
    //     const data = await scrapeAmazon(amznurl);
    //     console.log(data);
    //     const flipurl="https://www.flipkart.com/nice-furniture-fugo-goods-model-ng-233-high-back-ergonomic-revolving-chair-leatherette-office-executive-chair/p/itmf5hrghghtkhpe?pid=OSCF5HFRSEWYR4ZQ&lid=LSTOSCF5HFRSEWYR4ZQZGQOEK&marketplace=FLIPKART&store=wwe%2Fy7b%2Ffoc&srno=b_1_2&otracker=browse&fm=organic&iid=en_WJBE8rOzoIZklLn0GpNGZU7YI3XDHJdXMLfdBqc1mPqlKGtyklV4X1lu8rE2xbWOTRlzJEjN8t42beh12yE9-g%3D%3D&ppt=browse&ppn=browse"    
    //     // Step 2: Use the title to search for the product on Flipkart
    //     const flipkartData = await scrapeFlipkart(flipurl);
    //     console.log('Flipkart Data:', flipkartData);
    // })();

    module.exports=scrapeFlipkart;
