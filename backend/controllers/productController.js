const Product = require('../models/Product');

// Create and save a new product
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const { productnumber, productname, dealerprice, profitrate, collecteddate } = req.body;

    // Convert to numbers to ensure correct calculation
    const dealerPrice = parseFloat(dealerprice) || 0;
    const profitRate = parseFloat(profitrate) || 0;

    // Calculate selling price
    const sellingprice = dealerPrice + (dealerPrice * (profitRate / 100));

    // Create new product
    const product = new Product({
        
        productname,
        productnumber,
        dealerprice: dealerPrice,
        profitrate: profitRate,
        sellingprice,
        collecteddate
    });

    // Save product in the database
    product.save()
        .then(() => res.status(201).send({ message: "Product Registered Successfully" }))
        .catch(err => res.status(500).send({ message: err.message || "Some error occurred while registering the product" }));
};

// Retrieve all products
exports.findAll = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const products = await Product.find().limit(limit);
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error retrieving products" });
  }
};

// Retrieve a single product by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Product not found with id ${id}` });
            } else {
                res.send(data);
            }
        })
        .catch(err => res.status(500).send({ message: `Error retrieving product with id ${id}` }));
};

// Update a product by ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty!" });
    }

    const id = req.params.id;

    // Convert to numbers for recalculating selling price
    const dealerPrice = parseFloat(req.body.dealerprice) || 0;
    const profitRate = parseFloat(req.body.profitrate) || 0;

    req.body.sellingprice = dealerPrice + (dealerPrice * (profitRate / 100));

    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update product with id ${id}. Maybe product not found!` });
            } else {
                res.status(201).send({ message: "Product updated successfully", data });
            }
        })
        .catch(err => res.status(500).send({ message: `Error updating product with id ${id}` }));
};

// Delete a product by ID
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log(`Deleting product with id: ${id}`);
    Product.findByIdAndDelete(id)
      .then(data => {
          if (!data) {
              res.status(404).send({ message: `Cannot delete product with id ${id}` });
          } else {
              res.send({ message: "Product was deleted successfully!" });
          }
      })
      .catch(err => {
          console.error(`Error deleting product with id ${id}:`, err);
          res.status(500).send({
              message: "Could not delete product with id " + id
          });
      });
};

