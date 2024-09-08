const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer'); // For file uploads
const Product = require('./models/Product'); // Product model

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost/hindustankeKisan', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Add new product
app.post('/add-product', upload.single('image'), (req, res) => {
    const newProduct = new Product({
        name: req.body.productName,
        price: req.body.price,
        salePrice: req.body.salePrice,
        category: req.body.category,
        image: req.file.path, // Store file path
        description: req.body.description,
    });

    newProduct.save()
        .then(() => res.send('Product added successfully!'))
        .catch(err => res.status(400).send(err));
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
