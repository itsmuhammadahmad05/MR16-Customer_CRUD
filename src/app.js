import "dotenv/config";
import express from "express";
import { connectDB } from "./DB/config.js";
import syncDB from "./DB/init.js";






connectDB();
syncDB().then(() => {
    console.log("DB synced");
});

const app = express();
app.use(express.json());
// app.use(allRoutes);


app.listen(3000, () => {
    console.log("Server started at port 3000");
    });