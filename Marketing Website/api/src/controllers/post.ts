import express, { Request, Response } from "express";
import PostModel from "../models/post";
import { Post } from "../types/post";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../utils/middleware";
import UserRegisterModel from "../models/userRegister";
import { Types } from "mongoose";

const postRouter = express.Router();

postRouter.get("/", async (req: CustomRequest, res: Response) => {
  try {
    const some = await PostModel.find({});
    res.json(some);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

postRouter.post("/", async (req: CustomRequest, res: Response) => {
  const { title, image, description }: Post = req.body;

  try {
    const decodedToken = jwt.verify(req.token!, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    if (decodedToken.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Requires admin role" });
    }

    const newPost = new PostModel({
      title,
      image,
      description,
      createdBy: decodedToken.id,
    });

    await newPost.save();

    const newPostId = newPost._id as Types.ObjectId;

    const user = await UserRegisterModel.findById(decodedToken.id);
    if (user) {
      user.post.push(newPostId);
      await user.save();
    }

    res.status(201).json({ message: "Publicación creada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

postRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const getById = await PostModel.findById(id);
    if (!getById) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(getById);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

postRouter.delete("/", async (req: Request, res: Response) => {});

postRouter.put("/", async (req: Request, res: Response) => {});

export default postRouter;
