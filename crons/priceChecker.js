    const cron = require('cron');
    const Product = require('../models/Product');
    const scrapeAmazon = require('../services/amazonScrapper');
    const scrapeFlipkart = require('../services/flipkartScrapper');
    const productController=require('../controllers/productController')
    // Helper function to update product in the database

    const parsePrice = (priceString) => {
        if (!priceString) return null; // Handle empty price strings
        return Number(priceString.replace(/[^0-9.]/g, '')); // Remove ₹, commas, and non-numeric chars
    };
    
    const updateProduct = async (id, newData) => {
        try {
            const sanitizedPrice = parsePrice(newData.price);

            await Product.findByIdAndUpdate(id, {
                title: newData.title,
                image_url: newData.image,
                stock: newData.stock,
                description: newData.description,
                current_price: sanitizedPrice,
            });
            console.log(`Product with ID ${id} updated successfully.`);
        } catch (error) {
            console.error(`Error updating product with ID ${id}:`, error.message);
        }
    };

    // Job to update products
    const updateProducts = async () => {
        try {
            console.log('Starting product update job...');
            // const products = await Product.find();
            const products =await Product.find();
            console.log("here are your products--->",products);

            for (const product of products) {
                const { _id, link } = product;
                let updatedData = null;

                // Check and call respective scraper based on the URL
                if (link.includes('amazon')) {
                    console.log(`Scraping Amazon data for product ID ${_id}...`);
                    updatedData = await scrapeAmazon(link);
                } else if (link.includes('flipkart')) {
                    console.log(`Scraping Flipkart data for product ID ${_id}...`);
                    updatedData = await scrapeFlipkart(link);
                } else {
                    console.log(`No valid scraper found for product ID ${_id}. Skipping.`);
                }

                // Update the product if data is scraped successfully
                if (updatedData) {
                    const hasChanges =parsePrice(updatedData.price)!=product.current_price;
                    console.log("here is old price-->"+product.current_price+" and here is new price--->"+parsePrice(updatedData.price))
                    if (hasChanges) {
                        console.log(`Changes detected for product ID ${_id}. Updating...`);
                        await updateProduct(_id, updatedData);
                    } else {
                        console.log(`No changes detected for product ID ${_id}.`);
                    }
                }
            }

            console.log('Product update job completed.');
        } catch (error) {
            console.error('Error during product update:', error.message);
        }
    };
    // Schedule the cron job
    // const job = new cron.CronJob('*/30 * * * *', updateProducts);
    // job.start();

    module.exports = updateProducts;
