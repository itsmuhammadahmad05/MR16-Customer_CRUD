import { DataTypes } from "sequelize";
import sequelize from "../../db/config";

const UserModel = sequelize.define(
    "User",
    {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
        timestamps:false,
    }
);

export default UserModel;
