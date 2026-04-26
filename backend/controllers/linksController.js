import { db } from "../database/db.js";
import { nanoid } from "nanoid";

export function createShortUrl(req, res){
    const { url } = req.body;
    if(!url){
        return res.status(400).json({ error: "URL é obrigatória"})
        console.log(url);
    }
    const code = nanoid(6);
    const sql = "INSERT INTO links (original_url, short_code) VALUES (?, ?)"
    db.query(sql, [url, code], (err) =>{
        if(err){
            console.log(err);
            res.status(500).json({ message: "Erro interno do servidor"})
            return;
            
        }

        res.json({
            shortUrl: `http://localhost:3000/${code}`
        })
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