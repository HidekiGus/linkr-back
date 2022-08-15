import { v4 as uuid } from 'uuid';
import { generateNewSession } from '../repositories/authRepository.js';

export async function createNewSession(req, res) {
    const user = res.locals.user;
    const newToken = uuid();

    try {
        await generateNewSession(user.id, newToken);

        const newUser = {
            ...user,
            token: newToken
        };

        res.status(200).send(newUser);
    } catch (err) {
        res.status(500).send("createNewSession: " + err);
    }
}