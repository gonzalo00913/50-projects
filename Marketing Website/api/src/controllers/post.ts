import express, { Request, Response } from "express";
import PostModel from "../models/post";
import { Post } from "../types/post";

const postRouter = express.Router();

postRouter.post("/", async (req: Request, res: Response) => {
  const { title, image, description, createdBy }: Post = req.body;

  try {
    const newPost = new PostModel({
      title,
      image,
      description,
      createdBy,
    });

    await newPost.save();
    res.status(201).json({ message: "Publicación creada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

export default postRouter;
