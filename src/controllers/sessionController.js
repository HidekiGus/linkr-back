import { v4 as uuid } from 'uuid';
import { getUserById, deletePreviousSession, generateNewSession } from '../repositories/authRepository.js';

export async function createNewSession(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '');
    const newToken = uuid();

    try {
        const result = await getUserByToken(token);
        await deletePreviousSession(token); 
        await generateNewSession(result.rows[0].id, newToken);

        const user = {
            ...result.rows[0],
            token: newToken
        };

        res.status(200).send(user);
    } catch (err) {
        res.status(500).send("createNewSession: " + err);
    }
}