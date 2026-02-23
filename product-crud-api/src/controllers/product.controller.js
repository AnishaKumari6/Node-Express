import mongoose from "mongoose";
import { Product } from "../models/product.model.js";


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); 
    res.json({ count: products.length, products });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;

    if (!name || price === undefined || !category) {
      return res.status(400).json({
        message: "Validation error: name, price, category are required",
      });
    }

    const product = await Product.create({ name, price, category, inStock });
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated", product: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted", product: deleted });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};