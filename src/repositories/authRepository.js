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

export async function generateNewSession(id, token) {
    return await connection.query(`
        UPDATE sessions
        SET token = $2
        WHERE user_id = $1
    `,
        [
            id,
            token
        ]
    );
}

export async function findSession(token) {
    return await connection.query(`
        SELECT users.id, users.name, users.email, users.image FROM users
        JOIN sessions ON sessions.user_id = users.id
        WHERE sessions.token = $1
    `,
        [token]
    )
}