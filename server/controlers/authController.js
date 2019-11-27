/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
import bcrypt from 'bcryptjs';
import users from '../models/users';
import MakeToken from '../helper/tokenGen';

class authController {

    static signup(req, res) {
        const salt = bcrypt.genSaltSync(10);
        const passwordEncr = bcrypt.hashSync(req.body.password, salt);
        const user = {
            id: users.length + 1,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            username: req.body.username,
            password: passwordEncr
        };

        const found = users.find(u => u.email === user.email);
        if (!found) {
            users.push(user)
            res.status(201).json({
                status: 201,
                message: 'User successfully created',
                data: user,
                token: MakeToken(user.email, user.id)
            })
        } else{
            return res.status(409).json({
                status: 409,
                message: 'user already exists'
            })
        }
    }
    
    static signin(req, res){
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        const found = users.find(u => u.email === user.email);
        if(found) {
            const compare =  bcrypt.compareSync(user.password,found.password)
            if(compare) {
                const tokn = MakeToken(user.email,user.id);
                return res.status(200).json({
                    status:200,
                    token:tokn,
                    message:'User successfully logged in'
                })
            } else {
                return res.status(401).json({
                    status:401,
                    error: 'Password is incorrect'
                })
            }
        } 
        return res.status(404).json({
            status:404,
            error: 'Email does not exist'
        });

    }
}

export default authController;