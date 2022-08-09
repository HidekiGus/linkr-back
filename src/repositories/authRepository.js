import connection from '../dbStrategy/pg.js';

export async function insertNewUser(user) {
    return await connection.query(
        'INSERT INTO users (name, email, password, image) VALUES ($1, $2, $3, $4)',
        [user.name, user.email, user.password, user.image]
    )
}