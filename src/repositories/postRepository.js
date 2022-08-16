import connection from '../dbStrategy/pg.js';

export async function insertPost(post) {
    return await connection.query(
        'INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3)',
        [post.userId, post.link, post.description]
    )
}

export async function findLastPost(userId) {
    return await connection.query(`
        SELECT * FROM posts
        WHERE user_id = $1
        ORDER BY id DESC
        LIMIT 1
    `, [userId])
}

export async function insertHashtagPost(postId, hashtagId) {
    return await connection.query(`
        INSERT INTO hashtags_posts (post_id, hashtag_id)
        VALUES ($1, $2)
    `, [postId, hashtagId])
}