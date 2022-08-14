import { insertPost } from '../repositories/postRepository.js'

export async function postPost(req, res) {
    try {
        const post = req.body;

        await insertPost(post);
        res.status(201).send('Post realizado.');
    } catch (error) {
        res.status(500).send(error)
    }
}