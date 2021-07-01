import express from 'express'
import cors from 'cors'
import pool from './dbconfig.js'
import sciezkiFirm from './sciezki/firmy.js'
const app = express();
import dotenv from 'dotenv'
dotenv.config();
//middlewares
app.use(cors());
app.use(express.json());
app.use(sciezkiFirm);

console.log(process.env.APIPORT);
// app.listen(9999, ()=>{
//     console.log("slucham portu " + process.env.APIPORT)
// })
app.listen(process.env.APIPORT, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${process.env.APIPORT}`);
});