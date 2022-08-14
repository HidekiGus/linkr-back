import { findHashtag, insertHashtags } from "../repositories/hashtagRepository.js";

export async function handleHashtag(newHashtag) {
    try {
        const hashtag = await findHashtag(newHashtag);

        if(hashtag.rowCount === 0) {
            return await insertHashtags(newHashtag);
        }
    } catch (error) {
        res.status(500).send(error)
    }
}