import connection from '../dbStrategy/pg.js';

export async function insertNewUser(user, encryptedPassword) {
    return await connection.query(
        'INSERT INTO users (name, email, password, image) VALUES ($1, $2, $3, $4)',
        [user.name, user.email, encryptedPassword, user.image]
    )
}

export async function findEmail(email) {
    return await connection.query('SELECT * FROM users WHERE email = $1', [email])
}