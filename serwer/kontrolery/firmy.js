import { json } from 'express';
import dbconfig from '../dbconfig.js'

class Company {

   
   async zapytaj(stringZapytania){
      const result = await dbconfig.query(stringZapytania).catch(console.log);
      return result.rows;
   }
   async zapytajID(id){
      const result = await dbconfig.query("SELECT * FROM firmy WHERE id_firmy=$1",[id]).catch(console.log);
      return result.rows;
   }

}







export default Company;