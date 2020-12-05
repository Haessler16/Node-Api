import Products from "../models/products";

export const getProducts = async (req, res) => {
  const products = await Products.find();
  res.json(products);
};

export const createProducts = async (req, res) => {
  const { name, category, price, imgURL } = req.body;
  const newProducts = new Products({ name, category, price, imgURL });
  const productSave = await newProducts.save();
  res.status(201).json(productSave);
};

export const getProductsById = async (req, res) => {
  const productById = await Products.findById(req.params.productId);
  res.status(200).json(productById);
};

export const updateProductsById = async (req, res) => {
  const id = req.params.productId;
  const updatedProducts = await Products.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updatedProducts);
};

export const deleteProductsById = async (req, res) => {
  await Products.findByIdAndDelete(req.params.productId);
  res.status(204).json();
};
