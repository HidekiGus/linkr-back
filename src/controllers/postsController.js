import { getAllPosts } from "../repositories/postsRepository.js";

export async function getPosts(req, res) {
    try {
        const posts = await getAllPosts();
        return res.status(200).send(posts.rows);
    } catch(error) {
        return res.status(500).send(error);
    }
}