import connection from '../dbStrategy/pg.js';

export async function insertPost(post) {
    return await connection.query(
        'INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3)',
        [post.userId, post.link, post.description]
    )
}

export async function filterPostsByHashtag(hashtag) {
    return connection.query(`
        SELECT * FROM posts
        JOIN hashtags_posts ON hashtags_posts.post_id = posts.id
        JOIN hashtags ON hashtags.id = hashtags_posts.hashtag_id
        WHERE hashtags.hashtag = $1
    `,
        [hashtag]
    );
}