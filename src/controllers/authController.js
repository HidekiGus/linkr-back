import bcrypt from 'bcrypt';
import { findEmail, insertNewUser } from "../repositories/authRepository.js";

export async function signUp(req, res) {
    try {
        const user = req.body;
        const unique = await findEmail(user.email);
        const encryptedPassword = bcrypt.hashSync(user.password, 5);

        if(unique.rowCount !== 0) {
            return res.status(409).send('Email já cadastrado')
        }
        
        await insertNewUser(user, encryptedPassword);
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (error) {
        res.status(500).send(error)
    }
}