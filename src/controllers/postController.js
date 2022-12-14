import urlMetadata from "url-metadata";
import { findLastPost, getAllPosts, insertHashtagPost, insertPost } from '../repositories/postRepository.js'

export async function postPost(req, res) {
    try {
        const hashtagsId = res.locals.hashtags;
        const post = req.body;
    
        await insertPost(post);
        const { rows: lastPost } = await findLastPost(post.userId);
    
        for(let i = 0; i < hashtagsId.length; i++) {
            await insertHashtagPost(lastPost[0].id, hashtagsId[i])
        }
    
        res.status(201).send('Post realizado.');
    } catch (error) {
        res.status(500).send(error)
    }
}

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
        console.log(error)
        return res.status(500).send(error);
    }
}