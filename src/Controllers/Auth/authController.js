    import { compare, hash } from "bcrypt";
    import jwt from "jsonwebtoken";
    import TokenModel from "../../model/Auth/token.js";
    import UserModel from "../../model/user/index.js";
    
    const AuthController = {
    signUp: async (req, res) => {
        try {
        const payload = req.body;

        const user = await UserModel.findOne({
            where: {
            email: payload.email,
            },
        });

        if (user) {
            return res
            .status(400)
            .json({ message: "User with this email already exists" });
        }

        const hashPassword = await hash(payload.password, 10);

        await UserModel.create({
            ...payload,
            password: hashPassword,
        });
            return res.status(201).json({ message: "User Registered" });
        } 
        catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        }
    },
    signIn: async (req, res) => {
        try {
        const { email, password } = req.body;

        let user = await UserModel.findOne({
            where: {
            email,
            },
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        user = user.toJSON();
        const checkPassword = await compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        delete user.password;
        console.log(user, "user");
        const token = jwt.sign(user, JWT_SECRET_KEY, {
            expiresIn: "1h",
        });

        await TokenModel.create({
            token,
        });
            return res.status(200).json({ data: user, token });
        } 
        catch (error) {
        console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    };

    export default AuthController;
