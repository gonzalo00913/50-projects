import express, { Request, Response } from "express";
import PostModel from "../models/post";
import { Post } from "../types/post";
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../utils/middleware'; 

const postRouter = express.Router();

postRouter.get("/", async(req: CustomRequest, res: Response) => {

  try {
    const decodedToken = jwt.verify(req.token!, process.env.JWT_SECRET!) as { id: string, role: string};

    const some = await PostModel.find({})
    res.json(some);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }

})

postRouter.post("/", async (req: CustomRequest, res: Response) => {
  const { title, image, description }: Post = req.body;

  try {
    const decodedToken = jwt.verify(req.token!, process.env.JWT_SECRET!) as { id: string, role: string};

    if(decodedToken.role !== "admin"){
      return res.status(403).json({ message: "Forbidden: Requires admin role" });
    }

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


postRouter.get("/:id", async(req: Request, res: Response) => {})

postRouter.delete("/", async(req: Request, res: Response) => {})

postRouter.put("/", async(req: Request, res: Response) => {})

export default postRouter;