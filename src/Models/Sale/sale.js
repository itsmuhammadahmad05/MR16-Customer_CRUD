import { DataTypes } from "sequelize";
import sequelize from "../../DB/config.js";

const SalesModel = sequelize.define(
    "Sales",
    {
    totalAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    },
    {timestamps:false}
);

export default SalesModel;
