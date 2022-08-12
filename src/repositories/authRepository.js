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

export async function findUserByToken(token) {
    return await connection.query(`SELECT "userId" FROM sessions WHERE token = $1`, [token]);
}

export async function getUserByToken(token) {
    return await connection.query(`
        SELECT users.id, users.name, users.email, users.image FROM users
        JOIN sessions ON sessions."userId" = users.id
        WHERE sessions.token = $1
    `,
        [token]
    );
}

export async function deletePreviousSession(id) {
    return await connection.query(`DELETE * FROM sessions WHERE "userId = $1`, [id]);
}

export async function generateNewSession(id, token) {
    return await connection.query(`INSERT INTO sessions ("userId", "token") VALUES ($1, $2)`, [id, token]);
}