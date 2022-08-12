import connection from '../dbStrategy/pg.js';

export async function insertHashtags(hashtag) {
    return await connection.query(
        'INSERT INTO hashtags (name) VALUES ($1)',
        [hashtag]
    )
}