import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js"
import { tokenSign } from "../utils/handleJWT.js";

export const registerController = async (req, res) => {
    try {
        const userData = req.body;
        const newpassword = userData.password
        const hashpassword = await bcrypt.hash(newpassword, 10);
        userData.password = hashpassword;
        const newUser = await UserModel.create(userData)
        res.status(201).json({
            message: "User created.",
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
     } 
     catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export  const  loginController = async (req, res) => {
    try{
    const userData = req.body
    const loginPassword = userData.password
    const user = await UserModel.findOne({where:{email: userData.email}})
    const hashpassword = user.password
    console.log(hashpassword)
    const checkPassword = await bcrypt.compare(loginPassword, hashpassword)
    console.log(checkPassword)

    if(!checkPassword) {
        res.status(401).json({ message: "Wrong password." });
    }
    const userForSessionData = {
        role: user.role,
        name: user.name
    }
    const sessionData = {
        token: await tokenSign (user),
        user: userForSessionData
    }
    
    res.status(200).json(sessionData)
    }
    catch (error) {
    res.status(500).json({message: error.message});
    }
}