import { UserModel } from "../Models/User.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signup = async (req, res) => {
    try {
        const {username, email, password}= req.body;
        const existUser = await UserModel.findOne({email})
        if(existUser){
            return res.status(402).json({success:false,message: 'User already exist'})
        }
        const newUser = new UserModel({username, email, password    })
        newUser.password = await bcrypt.hash(password, 10)
        await newUser.save()
        return res.status(201).json({success:true, message: 'User SignedUp successfully'})
    } catch (error) {
        return res.status(500).json({success:false, message: "Internal server error"})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({success:false, message: 'User not found'})
        }
        const isPassword =await bcrypt.compare(password, user.password)
        if(!isPassword){
            return res.status(400).json({success:false, message: 'Invalid credentials'})
        }
        const token = jwt.sign(
            {email:user.email , id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        return res.status(200).json({success:true, message: 'User logged in successfully',token,email,name:user.username})
    } catch (error) {
        return res.status(500).json({success:false, message: "Internal server error"})
    }
}

export {signup, login}