import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"

const verifyJWT = async  function(req, res, next) {
  try {
     // Get the access token from the request cookie/header.
    //Check if the access token exists.
  //Verify the access token using your JWT secret.
  //Find the user in MongoDB using that  decoded token ID.
  //If user doesn't exist, return Unauthorized.
  //Attach the user to req.user.

      const token = req.cookies?.accessToken;
  
      if(!token) {
           return res.status(400).json({
              message: "Unauthorized",
          })
      }
  
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      const user = await User.findById(decodedToken?._id)
  
      if(!user) {
           return res.status(400).json({
              message: "Unauthorized",
          })
      }
  
      req.user = user;
      next();
  } catch (error) {
    
    next(error)
  }

}

export {verifyJWT}