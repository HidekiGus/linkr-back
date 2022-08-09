export async function signUp(req, res) {
    try {
        const user = req.body;
        
        await insertNewUser(user);
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (error) {
        res.status(500).send(error)
    }
}