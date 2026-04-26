import express from "express";
import { db } from "./database/db.js";
import linksRoutes from "./routes/links.js";
import "dotenv/config";

const app = express();
app.use(express.json());
const PORT = process.env.PORT

app.get("/", (req, res) =>{
    res.send("Servidor rodando")
})

app.use("/", linksRoutes);

app.listen(PORT,() => {
    console.log(`Servidor rodando na porta: http://localhost:${PORT}`)
})