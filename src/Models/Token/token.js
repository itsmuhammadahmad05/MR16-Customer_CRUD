import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

    const TokenModel = sequelize.define(
    "Token",
    {
        token: {
        type: DataTypes.STRING(500),
        allowNull: false,
        },
    },
    {
        timestamps:false,
    }
    );

export default TokenModel;
