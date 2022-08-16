import db from "../../dbStrategy/pg.js"
export async function pesquisa(req, res) {
    const conta = req.query.nome;
   
    const pesquisar='%'+conta+'%'
    const resultado = await db.query(`SELECT id,name,image FROM
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
export async function hashtagsTrending(req, res) {
    try{
        const resultado = await db.query(`SELECT 
        h.id,h.hashtag AS nome, 
        COUNT(hp."id") AS "numero"
    FROM hastags_posts hp
        JOIN hashtags h ON h.id=hp.hashtag_id
    GROUP BY h.id;`)
   
    const b=resultado.rows
    b.sort(function(x,y){
        return y.numero - x.numero;
    
        })
        const resposta =[]
        for(let i=0; i<10 && b.length>i;i++){
            resposta.push(b[i])
        }
        console.log(resposta)
     res.status(200).send(resposta)
     
    } catch (error) {
        res.status(500).send(error)
    }
   
}
export async function buscarUsuario(req, res) {
    const conta = req.params.id
    console.log(conta)
    try{
        const user = await db.query(`SELECT * FROM
     users WHERE id = $1`,[Number(conta)])
     console.log(user.rows)
     res.status(200).send(user.rows[0].name)
    } catch (error) {
        res.status(500).send(error)
    }
   
}  
export async function buscarUsuarioPost(req, res) {
    const conta = req.params.id
    console.log(conta)
    try{
        const user = await db.query(`SELECT * FROM
     users WHERE id = $1`,[Number(conta)])
     console.log(user.rows)
     const posts = await db.query(`SELECT * FROM
     posts WHERE user_id = $1`,[user.rows[0].id])
     const resPost =posts.rows
     res.status(200).send(resPost)
    } catch (error) {
        res.status(500).send(error)
    }
   
} 
export async function buscarCurtidas(req, res) {
    try{
        const resultado = await db.query(`SELECT 
        c.hashtag AS nome, 
        COUNT(hp."id") AS "numero"
    FROM hastags_posts hp
        JOIN curtidas c ON c.id=hp.hashtag_id
    GROUP BY c.id;`)
     res.status(200).send(resultado.rows)
    } catch (error) {
        res.status(500).send(error)
    }
} 