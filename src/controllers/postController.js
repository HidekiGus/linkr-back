import { insertPost, filterPostsByHashtag } from '../repositories/postRepository.js'

export async function postPost(req, res) {
    try {
        const post = req.body;

        await insertPost(post);
        res.status(201).send('Post realizado.');
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function getHashtagPosts(req, res) {
    const { hashtag } = req.params;

    try {
        const {rows: posts} = await filterPostsByHashtag(hashtag);

        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send(err);
    }
}