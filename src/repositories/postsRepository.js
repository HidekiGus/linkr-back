import connection from "../dbStrategy/pg.js";
import urlMetadata from "url-metadata";

export async function getAllPosts() {
    return await connection.query(`
        SELECT users.name, users.image, posts.description, posts.link FROM users
        JOIN posts
        ON posts."user_id"=users.id
        ORDER BY posts."createdAt" DESC
        LIMIT 20;`
    );
}