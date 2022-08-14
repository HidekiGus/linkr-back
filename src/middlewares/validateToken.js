import { findSession } from "../repositories/authRepository.js";

export async function validateToken(req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        const {rows: session} = await findSession(token);

        if (!session[0]) {
            return res.sendStatus(401);
        }

        res.locals.token = token;
        res.locals.user = session[0];
        next();
    } catch (error) {
        res.status(500).send(error);
    }
}