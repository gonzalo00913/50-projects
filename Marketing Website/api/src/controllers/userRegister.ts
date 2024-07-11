import UserRegisterModel from "../models/userRegister";
import { UserRegistration } from "../types/users";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

const userRegisterRouter = express.Router();

userRegisterRouter.post("/", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role }: UserRegistration = req.body;

  try {
    const existingUser = await UserRegisterModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "The email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserRegisterModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "Registered user successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

userRegisterRouter.get("/", async (req: Request, res: Response) => {
  const user = await UserRegisterModel.find({});
  res.json(user);
});

export default userRegisterRouter;
