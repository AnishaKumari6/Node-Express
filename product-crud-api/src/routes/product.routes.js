import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);          
router.post("/", createProduct);          
router.put("/:id", updateProductById);    
router.delete("/:id", deleteProductById); 

export default router;