import express from "express";
import {
    getProducts,
    getProductsById,
    createProduct,
    updateProducts,
    deleteProducts,
} from "../controllers/Products.js";
const router = express.Router();

router.get("/Products", getProducts);
router.get("/Products/:id", getProductsById);
router.post("/Products", createProduct);
router.patch("/Products/:id", updateProducts);
router.delete("/Products/:id", deleteProducts);
export default router;