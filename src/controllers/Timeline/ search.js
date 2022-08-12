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
    console.log(conta)
    const resultado = await db.query(`SELECT * FROM
     hashtags WHERE hashtag = $1`,[conta])
    
     
     console.log(resultado.rows[0])
     const hashtagPosts = await db.query(`SELECT * FROM
     hastags_posts WHERE post_id = $1`,[resultado.rows[0].id])
     console.log(hashtagPosts.rows)
     const hashtags =[]
     for(let i=0;hashtagPosts.rows.length>i;i++){
        const caixa = await db.query(`SELECT * FROM
        posts WHERE id = $1`,[hashtagPosts.rows[i].post_id])
        hashtags.push(caixa.rows[0])
        
     }
     res.status(200).send(hashtags)
    } catch (error) {
        res.status(500).send(error)
    }
   
} 