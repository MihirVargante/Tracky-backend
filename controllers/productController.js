const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const {  title,
            price,
            stock,
            description,
            image_url,
            category,
            link,
            threshold_price,
            current_price,
            user_id } = req.body;
        if (!title || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        const product = new Product({
            title,
            price,
            stock,
            description,
            image_url,
            category,
            link,
            threshold_price,
            current_price,
            user_id:req.user._id,
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err.message });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ user_id: req.user._id });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const {  title,
            price,
            stock,
            description,
            image_url,
            category,
            link,
            threshold_price,
            current_price,
            user_id } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Only allow the owner to update
        if (product.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;
        product.image_url = image_url || product.image_url;
        product.link = link || product.link;
        product.threshold_price = threshold_price || product.threshold_price;
        product.current_price = current_price || product.current_price;

        await product.save();
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Only allow the owner to delete
        if (product.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await product.remove();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
