import mysql from "mysql2";
import "dotenv/config";

export const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.connect((err) => {
    if(err){
        console.log("Erro ao conectar com o MySql", err)
    }
    console.log("Conectado ao MySql")
})