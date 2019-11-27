/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
import Joi from '@hapi/joi';


const signUp = (req, res, next) => {
    const fields = Joi.object({
        firstname: Joi.string()
            .strict()
            .trim()
            .required(),
        lastname: Joi.string()
            .strict()
            .trim()
            .required(),
        email: Joi.string()
            .strict()
            .trim()
            .required()
            .email(),    
        phoneNumber: Joi.string()
                .strict()
                .trim()
                .required() ,
        username: Joi.string()
            .strict()
            .trim()
            .required(),
        password: Joi.string()
            .strict()
            .trim()
            .required()
    })
    const output = fields.validate(req.body);
    if(output.error != null){
        return res.status(400).json({
            status: 400,
            error: `${output.error.details[0].message}`
    });
}
    next();
};

const signIn = (req, res, next) => {
    const fields = Joi.object({
        email: Joi.string()
            .strict()
            .trim()
            .required()
            .email(),
        password: Joi.string()
            .strict()
            .trim()
            .required()
            .min(5)
    })
    const output = fields.validate(req.body);
    if(output.error != null) {
        return res.status(400).json({
            status: 400,
            error: `${output.error.details[0].message}`
        });
    }
    next();
    };


export  {signUp,signIn};



