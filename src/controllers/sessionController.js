import { v4 as uuid } from 'uuid';
import { getUserById, deletePreviousSession, generateNewSession } from '../repositories/authRepository.js';

export async function createNewSession(req, res) {
    const userId = res.locals.userId;
    const newToken = uuid();

    try {
        const result = await getUserById(userId);
        await deletePreviousSession(userId); 
        await generateNewSession(userId, newToken);

        const user = {
            ...result.rows[0],
            token: newToken
        };

        res.status(200).send(user);
    } catch (err) {
        res.status(500).send("createNewSession: " + err);
    }
}