import { Router } from "express";
import SalesController from "../../Controllers/Sale/salesController.js";


const salesRouter = Router();
salesRouter.get("/sales", SalesController.getAll);

salesRouter.post("/sales", SalesController.create);

salesRouter.get("/sales/:id", SalesController.getSingle);

// salesRouter.put("/sales/:id", SalesController.update);

// salesRouter.delete("/sales/:id", SalesController.delete);

export default salesRouter;
