// import User from "../models/student.js"; //import user model
// const protect=async (req,res,next)=>
// {
//     let token;
//     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
//     { //extracting the token 
//         try{
//             token=req.headers.authorization.split(' ')[1];
//             //decode the token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             //exclude the password field
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         }
//         catch(error)
//         {
//                 res.status(401).json({
//                     message:"Not Authorized, Token failed "
//                 })
//             }

//         }
//         if(!token)
//         {  
//         res.status(401).json({ message: 'Not authorized, no token' });
//         }
        
//         }

// /*const validate=(req,res,next)=>
// {
//     const {username,email,password}=req.body;
//     if(!username || !email ||!password)
//     {
//         res.status(400).json({ message: 'Please provide all required fields: username, email, password' });
//     }
//     next();
// }*/
// module.exports=
// {
//     protect
// };

import jwt from 'jsonwebtoken';
import  HttpError from '../models/errorModel';

const AuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(' ')[1];
    
        jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
            if (err) {
                return next(new HttpError("Unauthorized. Invalid token.", 403));
            }

            req.user = { id: info.id, role: info.role }; 
            next();
        });
    } else {
        return next(new HttpError("Unauthorized. No token", 402));
    }
};

export default AuthMiddleware;
