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
}

export default authController;