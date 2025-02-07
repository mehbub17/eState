import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res,next) => {
    
    const {username,email,password} = req.body;

    const hashed_password = bcryptjs.hashSync(password,10);

    const newUser = new User({username,email,password:hashed_password});


    try {
        await newUser.save();
        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        next(error);
    }

};

export const signin = async (req, res,next) => {
    
    const {email,password} = req.body;

    try {
        const user_valid = await User.findOne({            
            email
        });

        if(!user_valid){
            return next(errorHandler(404,'User not found'));
        }
        const isMatch = bcryptjs.compareSync(password,user_valid.password);

        if(!isMatch){
            return next(errorHandler(401,'Invalid credentials!'));
        }

        const token = jwt.sign({id:user_valid._id},process.env.JWT_SECRET);
        const {password:pass,...rest} = user_valid._doc;

        res.cookie('access_token',token,{httpOnly:true,expiresIn: '7d'})
        .status(200)
        .json({user:rest});

    } catch (error) {      
        next(error);
    }
}