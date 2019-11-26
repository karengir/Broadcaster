/* eslint-disable node/no-unsupported-features/es-syntax */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenVerify = (req,res,next)=>{ 
    try {
        const token = req.header('token');
        const valid = jwt.verify(token, process.env.SECRET);
        req.user = valid;
        next();
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: 'invalid token'
        });
    }

}   
export default tokenVerify;