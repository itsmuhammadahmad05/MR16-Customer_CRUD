import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import SalesModel from "../Sale/sale.js";
import ProductModel from "../../Models/Product/product.js"

const SaleProductModel = sequelize.define(
    "SaleProduct",
    {
    productQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rate: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    },
    {timestamps:false}
);

SalesModel.hasMany(SaleProductModel);
SaleProductModel.belongsTo(SalesModel);

ProductModel.hasMany(SaleProductModel);
SaleProductModel.belongsTo(ProductModel);

export default SaleProductModel;
