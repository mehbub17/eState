import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import { TbMapX } from 'react-icons/tb';

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

        const token = jwt.sign({id:user_valid._id},process.env.JWT_SECRET,{expiresIn: '7d'});
        const {password:pass,...rest} = user_valid._doc;

        res.cookie('access_token',token,{httpOnly:true,maxAge: 7*24*60*60*1000})
        .status(200)
        .json({user:rest});

    } catch (error) {      
        next(error);
    }
}

export const google = async (req, res,next) => {        
    const {name,email,photoURL} = req.body;

    try {

        const user = await User.findOne({email});

        if(user)
        {
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '7d'});
            const {password:pass,...rest} = user._doc;
            res.cookie('access_token',token,{httpOnly:true,maxAge: 7*24*60*60*1000})
            .status(200)
            .json({rest});
        }else{
            const generated_password = Math.random().toString(36).substring(8);
            
            const hashed_password = bcryptjs.hashSync(generated_password,10);
            
            const newUser = new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),email,password:hashed_password,
            avatar :req.body.photoURL
            });
            await newUser.save();

            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn: '7d'});

            const {password:pass,...rest} = newUser._doc;

            res.cookie('access_token',token,{httpOnly:true,maxAge: 7*24*60*60*1000})
            .status(200).json({rest});

        }
        
    } catch (error) {
        next(error);
    }

}