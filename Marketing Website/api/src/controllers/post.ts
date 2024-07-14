import express, { Request, Response } from "express";
import PostModel from "../models/post";
import { Post } from "../types/post";
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../utils/middleware'; 

const postRouter = express.Router();

postRouter.post("/", async (req: CustomRequest, res: Response) => { // Uso CustomRequest en lugar de Request
  const { title, image, description }: Post = req.body;

  try {
    const decodedToken = jwt.verify(req.token!, process.env.JWT_SECRET!) as { id: string };

    const newPost = new PostModel({
      title,
      image,
      description,
      createdBy: decodedToken.id,
    });

    await newPost.save();
    res.status(201).json({ message: "Publicación creada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

export default postRouter;