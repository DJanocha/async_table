import express from 'express';
import Firmy from '../kontrolery/firmy.js';
import KreatorZapytan from '../uzyteczne/KreatorZapytan.js'


const router = express.Router();



router.get('/favicon.ico', (req,res)=>{
    return;
   }) // ciagle sie wpieprzalo zapytanie z req.params zawierajacym favicon.ico, dlatego to wstawilem (stackoverflow pomogl) przed glownym
        // route'em, zeby favicon.ico bylo przechwytywane, nic sie z tym nie robilo (tak jakby bylo wyciszane) i potem glowny route
        //mogl sobie dzialac jak nalezy
router.get('/id_firmy/:id', async(req,res)=>{
    const {id} = req.params;
    const kontroler = new Firmy();
    res.send(await kontroler.zapytajID(id));
})
router.get('/:orderBy', async(req,res)=>{
    const pomocnik = new KreatorZapytan();
    const kontroler = new Firmy();
    const zapytanie = await pomocnik.wezStringZapytaniaSQL(req.params,req.query);//
    // res.send(zapytanie);//wyswietl zapytanie gotowe
    res.send(await kontroler.zapytaj(zapytanie)); // lub wyswietl odpowiedz na zapytanie

})



export default router;