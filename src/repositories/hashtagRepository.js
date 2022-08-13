import connection from '../dbStrategy/pg.js';

export async function insertHashtags(hashtag) {
    return await connection.query(
        'INSERT INTO hashtags (name) VALUES ($1)',
        [hashtag]
    )
}

export async function findHashtag(hashtag) {
    return await connection.query(
        'SELECT * FROM hashtags WHERE name = $1',
        [hashtag]
    )
}