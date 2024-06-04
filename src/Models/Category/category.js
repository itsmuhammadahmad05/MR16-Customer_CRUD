import { DataTypes } from "sequelize";
import sequelize from "../../DB/config.js";

const CategoryModel = sequelize.define(
    "Category", 
    {
    CategoryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
        timestamps:false,
    }
);

export default CategoryModel;
