import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;
const dbUsername = process.env.DB_USERNAME;
const dbHost = process.env.DB_HOST;

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: "postgres",
    logging: console.log,
});

const connectDB = async () => {
    try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    } catch (error) {
    console.error("Unable to connect to the database:", error);
    }
};

export { connectDB };
export default sequelize;
