import connection from "../dbStrategy/pg.js";

export async function getAllPosts() {
    return await connection.query(`SELECT * FROM posts ORDER BY "createdAt" DESC LIMIT 20;`);
}