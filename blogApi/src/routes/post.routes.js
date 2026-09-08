import express from "express";
import { createNewPost, deletePost, getAllPost, getOnePost, updatePost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/post", verifyJWT, createNewPost);
router.delete("/post/:postId", verifyJWT, deletePost)
router.patch("/post/:postId", verifyJWT, updatePost)
router.get("/post/:postId", getOnePost);
router.get("/post", getAllPost);

export default router;