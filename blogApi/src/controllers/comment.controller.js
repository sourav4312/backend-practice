import {Comment} from "../models/comment.model.js"
import { Post } from "../models/post.model.js";

const createComment = async (req, res) => {
    try {
        // Get comment from req.body
        //Get postId from req.params
        // Get logged in id from req.user?_.id
        // check comment validation
        // create user using comment post and author
        // return res

        const {content} = req.body;
        const postId = req.params.postId;
        const userId = req.user?._id;

        if(!content) {
            return res.status(400).json({message: "Content is required"});
        }
         
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(400).json({message: "Post doesn't exist"});
        }

        const comment = await Comment.create({
            content: content,
            post: postId,
            author: userId
        })

        return res.status(201).json({
         message: "Comment added successfully",
         comment: comment
      })
    } catch (error) {
        throw error;
    }
}

const getPostComments = async(req, res) => {
    const postId = req.params.postId

    const post = await Post.findById(postId);
        if(!post) {
            return res.status(400).json({message: "Post doesn't exist"});
        }

    const comments = await Comment.find({post: postId}).populate("author", "username");
    
    return res.status(200).json({
         message: "Comment fetched successfully",
         comments: comments
      })

}

const deleteComment = async(req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user?._id;
    
        const comment = await Comment.findById(commentId);
    
        if(!comment) {
            return res.status(400).json({message: "Comment doesn't exist"});
        }
    
        if(!(comment.author.toString() === userId.toString())) {
              return res.status(403).json({message: "Not authorized to delete this comment"});
        }
        await Comment.findByIdAndDelete(commentId);
    
        return res.status(200).json({
            message: "Comment deleted successfully"
        })
    
    } catch (error) {
        throw error
    }
}

export {createComment, getPostComments, deleteComment}