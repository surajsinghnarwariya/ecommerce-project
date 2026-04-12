const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ msg: 'Not found' });
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const { name, description, price, countInStock, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  const product = new Product({ name, description, price, countInStock, category, image });
  await product.save();
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ msg: 'Not found' });
  const { name, description, price, countInStock, category } = req.body;
  if (req.file) product.image = `/uploads/${req.file.filename}`;
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price ?? product.price;
  product.countInStock = countInStock ?? product.countInStock;
  product.category = category || product.category;
  await product.save();
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
};