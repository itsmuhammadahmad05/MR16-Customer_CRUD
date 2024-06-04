import SalesModel from "../../Models/Sale/sale.js";
import SaleProductModel from "../../Models/ProductSale/ProductSale.js";
import ProductModel from "../../Models/Product/product.js";

const SalesController = {
    //getting all sale
    getAll: async (req, res) => {
        try {
        const sales = await SalesModel.findAll({
            include: [{
                model : SaleProductModel,
                include:[ProductModel]
            }]
        });
        res.json({
            data: sales,
        });
        } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
        }
    },
    //getting single Sale 
    getSingle: async (req, res) => {
        try {
        const { id } = req.params;
        const sale = await SalesModel.findByPk(id, {
            include: [{
                model : SaleProductModel,
                include:[ProductModel]
            }]
        });
        if (!sale) {
            return res.status(404).json({ message: "No sale with this ID" });
        }
        res.status(200).json({ data: sale });
        } 
        catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
        }
    },
    //creating a sale 
    create: async (req, res) => {
        try {
        const payload = req.body;
        
        //calculating total amount against each sale
        let totalAmount = 0;
        payload.salesProducts.forEach(ele => {
            totalAmount = totalAmount + ele.productQuantity * ele.rate;
        });
        const sale = new SalesModel();
        sale.totalAmount = totalAmount
        await sale.save();
    
        //finding product and checking if stock is available or not
        const salesProducts = []; //array for storing bulk salesProducts
        for (let index = 0; index < payload.salesProducts.length; index++) {
            const ele = payload.salesProducts[index];
            
            const product = await ProductModel.findByPk(ele.ProductId);
            if (ele.productQuantity > product.stock) {
                return res.status(400).json({
                message: "The product " + product.name + " has in-sufficient stock",
                });
            }
            salesProducts.push({
            ...ele,
            SaleId: sale.id 
        });
        const saleProduct = await SaleProductModel.bulkCreate(salesProducts);//bulk creating in saleProductModel
        res.status(200).json({ message: "sale created", saleProduct });
        } 

        //updating stock
        await Promise.all(payload.salesProducts.map(async (ele) => {
            const existingProduct = await ProductModel.findById(ele.productId);
            if (existingProduct) {
                existingProduct.stock -= ele.productQuantity;
                await existingProduct.save();
            }
        }));
    }
        catch (error) {
        console.log("Error",error);
        res.status(500).json({ message: "Internal server error" });
        }
    },
//   update: (req, res) => {
//     try {
//       const { name } = req.params;
//       const payload = req.body;

//       const studentIndex = students.findIndex((ele) => ele.name == name);
//       if (studentIndex == -1) {
//         return res.status(404).json({ message: "No student with this name" });
//       }

//       if (payload.name) {
//         students[studentIndex].name = payload.name;
//       }

//       if (payload.class) {
//         students[studentIndex].class = payload.class;
//       }

//       // students[studentIndex].name = payload.name
//       //   ? payload.name
//       //   : students[studentIndex].name;
//       // students[studentIndex].class = payload.class
//       //   ? payload.class
//       //   : students[studentIndex].class;

//       res.status(200).json({ message: "Student Updated", students });
//     } catch (error) {
//       res.status(500).json({ message: "Internal server error" });
//     }
//   },
//   delete: (req, res) => {
//     try {
//       const { name } = req.params;

//       const studentIndex = students.findIndex((ele) => ele.name == name);
//       if (studentIndex == -1) {
//         return res.status(404).json({ message: "No student with this name" });
//       }
//       students.splice(studentIndex, 1);
//       res.status(200).json({ message: "Student Deleted" });
//     } catch (error) {
//       res.status(500).json({ message: "Internal server error" });
//     }
//   },
};

export default SalesController;
