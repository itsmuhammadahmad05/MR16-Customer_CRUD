import { Router } from "express";
import ProductController from "../../Controllers/Product/productController.js";
import AuthenticateMiddleware from "../../Middlewares/Auth/authMiddleware.js";



const productRouter = Router();
productRouter.get("/products", AuthenticateMiddleware, ProductController.getAll);

productRouter.post("/product", AuthenticateMiddleware, ProductController.create);

productRouter.get("/product/:id", AuthenticateMiddleware, ProductController.getSingle);

export default productRouter;
