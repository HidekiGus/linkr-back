import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { findEmail, findUserSession, generateNewSession, insertNewUser, updateSession } from "../repositories/authRepository.js";

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

export async function login(req, res) {
    try{
        const conta = req.body;
        const resultado = await findEmail(conta.email);
        const senha= resultado.rows[0] ? bcrypt.compareSync(conta.password, resultado.rows[0].password) : null;
        const token = uuid();
        const session = await findUserSession(resultado.rows[0].id);
        
        if(resultado.rows.length === 0){ 
            return res.status(401).send('email ou senha incorreto')
        }
        if(!senha){
            return res.status(401).send('email ou senha incorreto')
        }
        if(session.rowCount === 0) {
            await generateNewSession(resultado.rows[0].id, token)
        } else {
            await updateSession(resultado.rows[0].id, token)
        }

        res.status(200).send(token)
    } catch(e){
        return res.status(420).send('voce nao existe')
    }
}