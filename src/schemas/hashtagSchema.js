import joi from 'joi';

const hashtagSchema = joi.object({
    "hashtags": joi.array().items(joi.string().pattern(/^#{1}[a-zA-Z]*$/)).required()
});

export default hashtagSchema;