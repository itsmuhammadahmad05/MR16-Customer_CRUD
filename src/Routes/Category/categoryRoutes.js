import { Router } from "express";
import categoryController from "../../Controllers/Category/categoryController.js";
import AuthenticateMiddleware from "../../Middlewares/Auth/authMiddleware.js";

const categoryRouter = Router();
categoryRouter.get("/categories", AuthenticateMiddleware, categoryController.getAll);

categoryRouter.post("/category", AuthenticateMiddleware, categoryController.create);

categoryRouter.get("/category/:id", AuthenticateMiddleware, categoryController.getSingle);

export default categoryRouter;
