import db from "./../../dbStrategy/pg.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import joi from "joi";
export async function login(req, res) {
    const conta = req.body;
    console.log(conta)
    const userSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required()
    });
   
    const validar = userSchema.validate(conta)
      if(validar.error){
        return res.status(422).send('deu ruim -_-');
      }
     
  try{
    console.log('?')
    console.log(conta.email)
   
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
      });
   
     
      
     console.log('aqui')
        const resultado = await db.query(`SELECT * FROM users WHERE email =$1`,[conta.email])
        console.log('db')
        console.log(resultado.rows[0].email)
        if(resultado.rows.length ==0){ 
          console.log('vc n')
          return res.status(401).send('voce nao existe')
        }
        console.log(resultado.rows[0]) 
        const senha= bcrypt.compareSync(conta.password, resultado.rows[0].password)
        if(!senha){
          console.log('senha invalida')
          return res.status(401).send('voce nao existe')
        }
        const token =uuid()
        console.log(token)
        await db.query(`INSERT INTO sessions(user_id,token)
        VALUES ($1, $2)
        `,[Number(resultado.rows[0].id),token])
       

        
        res.status(200).send(token)

  } catch(e){
    console.log('erro login')
    return res.status(420).send('voce nao existe')
  }
}

