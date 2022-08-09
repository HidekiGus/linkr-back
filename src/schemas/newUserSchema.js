import joi from 'joi';

const newUserSchema = joi.object({
    "name": "fulano",
    "email": joi.string().email().required(),
    "password": joi.string().required(),
    "image": joi.string()
});

export default newUserSchema;