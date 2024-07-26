import UserRegisterModel from "../models/userRegister";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserLogin } from "../types/users";

import express, { Request, Response } from "express";


const loginRouter = express.Router()

loginRouter.post("/", async (req: Request, res: Response) => {
    const {email, password}:UserLogin = req.body
    try {
        const user = await UserRegisterModel.findOne({email})
        if(!user){
            return res.status(400).json({message: "Email is not registered"}) 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Incorrect password." });
        }
        
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET!/* , { expiresIn: '1h' } */);

        res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
})

export default loginRouter;