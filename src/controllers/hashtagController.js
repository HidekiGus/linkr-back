import { handleHashtag } from "../middlewares/handleHashtag.js";

export async function postHashtag(req, res) {
    try {
        const { hashtags } = req.body;
        
        await hashtags.map(each => handleHashtag(each));
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error)
    }
}