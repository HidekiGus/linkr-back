import urlMetadata from "url-metadata";
import { getAllPosts } from "../repositories/postsRepository.js";

export async function getPosts(req, res) {
    try {
        const posts = await getAllPosts();
        const postsWithMetadata = await Promise.all(posts.rows.map(async(row) => {
            return await urlMetadata(`${row.link}`).then(
                function (metadata) {
                    const obj = {
                        userImage: row.image,
                        userName: row.name,
                        userPostDescription: row.description,
                        userPostLink: row.link,
                        metadataTitle: metadata.title,
                        metadataDescription: metadata.description,
                        metadataImage: metadata.image
                    }
                    return obj;
                }, 
                function (error) {
                    return error;
                }
            )
        }));
        return res.status(200).send(postsWithMetadata);
    } catch(error) {
        return res.status(500).send(error);
    }
}