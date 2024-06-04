import { DataTypes } from "sequelize";
import sequelize from "../../DB/config.js"; 

const UserModel = sequelize.define(
    "User",
    {
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
