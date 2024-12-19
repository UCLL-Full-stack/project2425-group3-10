import jwt = require("jsonwebtoken");


const generateToken = (email: string): string => {
    const jwtSecret = process.env.JWT_SECRET
    if(!jwtSecret){
        throw new Error("JWT secret is not defined");
    }
    const options = {
        expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`,
        issuer: "PlayPal",
    }
    try {
        return jwt.sign({email}, jwtSecret, options);
    } catch (error) {
        throw new Error("Error occurred while generating token");
    }
}

export default { generateToken }