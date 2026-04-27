import { db } from "../database/db.js";
import { nanoid } from "nanoid";

export function createShortUrl(req, res){
    let { url } = req.body;
    if(!url){
        return res.status(400).json({ message: "URL é obrigatória"})
    }

    
    let parsedUrl;

    try {
        parsedUrl = new URL(url);

    } catch (error) {
        return res.status(400).json({ message: "URL inválida!"});
        console.log(error);
    }

    if(parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:"){
        return res.status(400).json({ message: "URL inválida! (Deve conter http: ou https:)"});
    }
    const code = nanoid(6);
    const sql = "INSERT INTO links (original_url, short_code) VALUES (?, ?)"
    db.query(sql, [url, code], (err) =>{
        if(err){
            console.log(err);
            res.status(500).json({ message: "Erro interno do servidor"})
            return;
            
        }
        return res.status(201).json({
        message: "Link criado com sucesso",
        shortUrl: `http://localhost:3000/${code}`
    });
    })
}

export function redirectUrl(req, res){
    const { code } = req.params;
    const sqlSelect = "SELECT * FROM links WHERE short_code = ?";

    db.query(sqlSelect, [ code ], (err, results) => {
        if(err){
            return res.status(500).json({ message: "Erro interno do servidor"})
            
        }

        if(results.length === 0){
            return res.status(404).json({ message: "Link não encontrado"});
            console.log(results);
        }

        const link = results[0];
        const sqlUpdate = "UPDATE links SET clicks = clicks + 1 WHERE id = ?";
        db.query(sqlUpdate, [ link.id ], );

        res.redirect(link.original_url);
    })
}