import authRouter from "./Auth/authRoutes.js";
import categoryRouter from "./Category/categoryRoutes.js";
import productRouter from "./Product/productRoutes.js";
import salesRouter from "./Sale/salesRoutes.js";

const allRoutes = [
    authRouter,
    productRouter,
    categoryRouter,
    salesRouter

];
export default allRoutes;
