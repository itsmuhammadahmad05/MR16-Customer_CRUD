import jwt from "jsonwebtoken";
import TokenModel from "../../Models/Token/token.js";

const AuthenticateMiddleware = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "UnAuthorized" });
    }
    token = token.replace("Bearer ", "");
    const checkToken = await TokenModel.findOne({
        where: { token },
    });
    if (!checkToken) {
        return res.status(401).json({ message: "UnAuthorized" });
    }
    try {
        const decoded = jwt.verify(token, '12345asdfghjkl67890');
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "UnAuthorized" });
    }
    };

export default AuthenticateMiddleware;
