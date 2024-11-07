const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5002;

app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests only from your frontend's domain (React default is localhost:3000)
  methods: 'GET,POST',  // Allow GET and POST methods
  allowedHeaders: 'Content-Type'  // Allow Content-Type header in requests
}));
app.use(express.json());

const productsdbFilePath = path.join(__dirname,"src", "productsdb.json")


const readProductsFromFile = () => {
  try {
    const data = fs.readFileSync(productsdbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products file:', error);
    throw new Error('Could not read products from file');
  }
};



app.get('/products', (req, res) => {
  try {
    const products = readProductsFromFile();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});


app.post('/checkout', (req, res) => {
  const purchasedItems = req.body; // Extract the productId and change (stock update)

  if (!Array.isArray(purchasedItems)) {           // errorcheck
    return res.status(400).json({ error: 'Invalid data format' });
  }

  try {
    const products = readProductsFromFile();

      // Check if there is enough stock for each purchased item
      for (const item of purchasedItems) {
        const product = products.find(p => p.id === item.id);
        if (!product) {
          return res.status(404).json({ error: `Product with ID ${item.id} not found` });
        }
        if (product.stock < item.quantity) {
          return res.status(400).json({
            error: `Not enough stock for product: ${product.name}. Available stock: ${product.stock}, Requested quantity: ${item.quantity}`
          });
        }
      }

      purchasedItems.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
          product.stock -= item.quantity;
        }
      });

    fs.writeFileSync(productsdbFilePath, JSON.stringify(products, null, 2));

    res.json({ message: 'Purchase successful!' });

  } catch (error) {
    res.status(500).json({ error: 'Error updating stock' }); // Error handling
  }
});



app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
