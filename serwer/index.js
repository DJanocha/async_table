import express from 'express'
import cors from 'cors'
import pool from './dbconfig.js'
import sciezkiFirm from './sciezki/firmy.js'
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(sciezkiFirm);


app.listen(process.env.APIPORT, ()=>{
    console.log("slucham portu " + process.env.APIPORT)
})