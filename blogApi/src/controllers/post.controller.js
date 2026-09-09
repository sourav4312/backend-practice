import { Post } from "../models/post.model.js";

const createNewPost = async function(req, res) {

   try {
     // get title and content from req.body
     // get user id from req.user middleware
     // validate title and content
     // create post 
     // set author: req.user?._id
     // save and send response
      const {title, content} = req.body;
      const user_id = req.user?._id;
 
      if(!title || !content) {
         return res.status(400).json({message: "All fields are required"});
      }
      const post = await Post.create({
         title: title,
         content: content,
         author: user_id
      })
 
      return res.status(201).json({
         message: "Post create successfully",
         post: post
      })
   } catch (error) {
       throw error
   }
}

const deletePost = async function(req, res) {
  try {
    /*  Get the post ID from req.params.
        Get the logged-in user ID from req.user._id.
        Find the post using the post ID.
       Check if the post exists.
       Check whether the post's author matches req.user._id
       If they don't match, return 403 Forbidden.
       Delete the post.
       Return a success response. */ 
  
       const postId = req.params.postId
       const user_id = req.user?._id
  
       const post = await Post.findById(postId)
  
       if(!post) {
          return res.status(404).json({message: "Post doesn't exist"});
       }
       // author has user_id in mongo
       if(!(post.author.toString() === user_id.toString())) {
          return res.status(403).json({message: "Not authorized to delete"});
       }
       await post.deleteOne()
  
       return res.status(200).json({
          message: "Post deleted successfully"
       })
  } catch (error) {
    throw error
  }
}

const getOnePost = async function(req, res) {
   try {
    const postId = req.params.postId;
 
    const post = await Post.findById(postId)
 
    if(!post) {
           return res.status(400).json({message: "Post doesn't exist"});
        }
     return res.status(200).json({
           message: "Post fetched successfully",
           post: post
        })
   } catch (error) {
     throw error
   }

}

const getAllPost = async function (req, res) {
try {
    /*
    Use Post.find() to get all posts.
    Check if there are no posts.
    Return the posts. */
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page-1)*limit
        const posts = await Post.find()
                                .skip(skip)
                                .limit(limit)
                                .populate("author", "username");
    
          if (!posts.length) {
                return res.status(404).json({
                    message: "No posts found"
                });
            }
        return res.status(200).json({
               message: "Post fetched successfully",
               posts: posts
            })  
} catch (error) {
   throw error 
}  
}

const updatePost = async function(req, res) {
  try {
    /* 
      Get new title or content 
      Get the post ID from req.params.
        Get the logged-in user ID from req.user._id.
        Find the post using the post ID.
       Check if the post exists.
       Check whether the post's author matches req.user._id
       If they don't match, return 403 Forbidden.
       update and save the post.
       Return a success response. */ 
       
       const postId = req.params.postId

       const{title,  content} = req.body;
       if(!title && !content){
           return res.status(400).json({message: "Need either title or content for update"});
       }

       const user_id = req.user?._id
  
       const post = await Post.findById(postId)
  
       if(!post) {
          return res.status(403).json({message: "Post doesn't exist"});
       }
       // author has user_id in mongo
       if(!(post.author.toString() === user_id.toString())) {
          return res.status(403).json({message: "Not authorized to update"});
       }

       if(title) {
        post.title = title
       }
       if(content) {
        post.content = content
       }
       await post.save()
  
       return res.status(200).json({
          message: "Post updated successfully",
          post: post
       })
  } catch (error) {
    throw error
  }
}

export {createNewPost, deletePost, getOnePost, getAllPost,updatePost}