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

export async function findSession(id) {
    return await connection.query(`
        SELECT * FROM sessions
        WHERE user_id = $1
    `,
        [id]
    )
}

export async function generateNewSession(id, token) {
    return await connection.query(`
        INSERT INTO sessions(user_id, token)
        VALUES ($1, $2)
        `,[Number(id), token]
    )
}

export async function updateSession(id, token) {
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
