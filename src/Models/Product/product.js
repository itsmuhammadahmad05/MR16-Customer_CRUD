import { DataTypes } from "sequelize";
import sequelize from "../../DB/config.js";
import CategoryModel from "../Category/category.js";

const ProductModel = sequelize.define("Product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
        timestamps:false,
    }
);

export default ProductModel;

ProductModel.belongsToMany(CategoryModel, { through: "categoryProducts" });
CategoryModel.belongsToMany(ProductModel, { through: "categoryProducts" });
