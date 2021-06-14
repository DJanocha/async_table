//import { Pool } from 'pg';  <- ta linia daje "Pool is not a constructor". najwyrazniej pg-pool nie wspiera wszystkich typow impmortow
import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';
dotenv.config();
/*
//okazalo sie, ze zle stworzylem plik .env i sie wywalalo ciagle przez to. tymi logami do tego doszedlem.

const result = dotenv.config();
console.log(result.parsed);
console.log("sprawdzamy dotenv")
console.log(process.env.USER);
console.log(process.env.PASSWORD);
console.log(process.env.HOST);
console.log(process.env.PORT);
console.log(process.env.DATABASE);
*/
const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE
})

export default pool;