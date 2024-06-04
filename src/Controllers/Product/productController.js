import CategoryModel from "../../Models/Category/category.js";
import ProductModel from "../../Models/Product/product.js";
import { Op } from "sequelize";

const ProductController = {
getAll: async (req, res) => {
    try {

    // const { search } = req.query;
    const products = await ProductModel.findAll({
        include: [
        {
            model: CategoryModel,
            attributes: ["name"],
            // where: {
            //     // id: {
            //     // [Op.like]: `%${search}%`,
            //     // },
            //     // name: {
            //     // [Op.like]: `%${search}%`,
            //     // },
            // },
            },
        ],
        });

        return res.json({data: products});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
},
getSingle: async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.findByPk(id);
        if (!product) {
        return res.status(404).json({ message: "No product with this name" });
        }
        return res.status(200).json({ data: product });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
},

create: async (req, res) => {
    try {
        const payload = req.body;
        console.log(payload, "payload");

        const product = new ProductModel();
        product.name = payload.name;
        product.price = payload.price;
        product.stock = payload.stock;

        await product.save();
        await product.addCategory(payload.categories);

        return res.status(200).json({ message: "Product created", product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
    },
};

export default ProductController;
