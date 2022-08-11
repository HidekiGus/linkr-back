import db from "./../../dbStrategy/pg.js"
export async function pesquisa(req, res) {
    const conta = req.query.nome;
    console.log('oi')
    const pesquisar='%'+conta+'%'
    const resultado = await db.query(`SELECT name,image FROM
     users WHERE name ilike $1`,[pesquisar])
    console.log(resultado.rows)
    res.status(200).send(resultado.rows)
}