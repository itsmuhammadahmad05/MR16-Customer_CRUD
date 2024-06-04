import sequelize from "./config.js";







const syncDB = async () => {
    await sequelize.sync({ alter: true, force: false });

};










export default syncDB;