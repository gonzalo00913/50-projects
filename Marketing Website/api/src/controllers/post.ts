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
    const decodedToken = jwt.verify(req.token!, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };
    
    if (decodedToken.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Requires admin role" });
    }

    const posts = await PostModel.find({createdBy: decodedToken.id});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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

postRouter.delete("/:id", async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
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

    const deletedPost = await PostModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

postRouter.put("/:id", async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { title, image, description }: Post = req.body;

  try {
    const decodedToken = jwt.verify(req.token!, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    if (decodedToken.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Prohibido: Se requiere rol de administrador" });
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { title, image, description },
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

export default postRouter;
