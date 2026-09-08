
import { User } from "../models/user.model.js"

const userRegister = async(req, res) => {
    try {
        // take input from req body
        // Check all fileds
        // check user already exist?
        // create user
        // send response 
         const{username, email, password} = req.body;
         
         if(!username || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
         }
    
         if(await User.findOne({$or: [{username}, {email}]})) {
            return res.status(400).json({message: "User already registered"})
         }
    
         const user = await User.create({
            username: username,
            email: email,
            password: password
         })
    
         const createdUser = await User.findById(user._id).select("-password")
         if(!createdUser){
            return res.status(400).json({message: "Failed to Create user"})
         }
         return res.status(200).json({message:"User registered successfully", user: createdUser});
    } catch (error) {
         return res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}   

const loginUser = async function(req, res) {

    try {
        // take username and password
        // check username exist in our database
        // exist than comparePassword
        // password correct then generate access Token and refresh token
        // set cookie
        // send response
    
        const {username, password} = req.body;
    
        if(!username || !password) {
            return res.status(400).json(
                {
                    message: "All field are required"
                }
            )
        }
    
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json(
                {
                    message: "User not registered or invalid"
                }
            )
        }
    
        const isPasswordValid =  await user.comparePassword(password);
    
        if(!isPasswordValid){
            return res.status(400).json(
                {
                    message: "Entered Password is incorrect"
                }
            )
        }
    
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken();
        

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    
        
        const options = {
             httpOnly: true,
             secure: false
        }
    
        return res.status(200)
                  .cookie("accessToken",  accessToken, options)
                  .cookie("refreshToken", refreshToken, options)
                  .json({
                    message: "User logged in Successfully",
                    user: loggedInUser
                  })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}

const logoutUser  = async function (req, res) {
    try {
        // Check which user is logged in using middleware
        // find user in database
        // remove his refresh Token
        // save the user
        // clear acces token , cookie
        // send response
    
        await User.findByIdAndUpdate(req.user._id, {
            $set: {
                   refreshToken: undefined
            }
        },
        {
            new: true
        })
        const options = {
        httpOnly: true,
        secure: false
        }
    
        return res.status(200)
              .clearCookie("accessToken", options)
              .clearCookie("refreshToken", options)
              .json(
                {message: "User logged out"}
              )
    } catch (error) {
        throw error
    }
}

const getProfile = async function(req, res) {

     return res.status(200).json({
        message: "User profile fetched successfully",
        user: req.user
    });
}

export {userRegister, loginUser, logoutUser, getProfile};