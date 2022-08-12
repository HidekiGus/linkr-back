import connection from '../dbStrategy/pg.js';

export async function insertPost(post) {
    return await connection.query(
        'INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3)',
        [post.userId, post.link, post.description]
    )
}