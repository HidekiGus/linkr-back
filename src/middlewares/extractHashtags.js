import { findHashtag, insertHashtags } from "../repositories/hashtagRepository.js";

export async function extractHashtags(req, res, next) {
    const { description } = req.body;
    const segregate = description.split(" ");
    const hashtagsId = [];
    
    for(let i = 0; i < segregate.length; i++) {
        let hashtag;
        if(segregate[i].startsWith("#")) {
            hashtag = await findHashtag(segregate[i]);

            if(hashtag.rowCount === 0) {
                await insertHashtags(segregate[i]);
                hashtag = await findHashtag(segregate[i]);
            }
            hashtagsId.push(hashtag.rows[0].id)
        }
    }
    res.locals.hashtags = hashtagsId;
    next();
}