import db from "./../../dbStrategy/pg.js"
export async function pesquisa(req, res) {
    const conta = req.query.nome;
   
    const pesquisar='%'+conta+'%'
    const resultado = await db.query(`SELECT name,image FROM
     users WHERE name ilike $1`,[pesquisar])
    console.log(resultado.rows)
    res.status(200).send(resultado.rows)
} 
export async function hashtag(req, res) {
    const conta = req.query.nome;
    try{
    if(conta.length== 0 || conta.length>20){
        return res.sendStatus(500)
    }
    const resultado = await db.query(`SELECT * FROM
     hashtags WHERE hashtag = $1`,[conta])
     if(resultado.rows.length ==0){
        await db.query(`INSERT INTO hashtags(hashtag)
        VALUES ($1)
        `,[conta])
     }
     const hashtagPosts = await db.query(`SELECT * FROM
     hashtags_posts WHERE hashtag_id = $1`,[resultado.rows[0].id])
     const hashtags =[]
     for(let i=0;hashtagPosts.rows.length>i;i++){
        const caixa = await db.query(`SELECT * FROM
        posts WHERE id = $1`,[hashtagPosts.rows[i].post_id])
        hashtags.push(caixa.rows[0])
     }
     res.status(20).send(hashtags)
    } catch (error) {
        res.status(500).send(error)
    }
   
} 