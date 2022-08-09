import joi from 'joi';

const newUserSchema = joi.object({
    "name": joi.string().pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ]*$/).required(),
    "email": joi.string().email().required(),
    "password": joi.string().required(),
    "image": joi.string().allow('').required()
});

export default newUserSchema;