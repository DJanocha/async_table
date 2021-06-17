import { ZMIEN_SORTOWANIE, ZMIEN_SZUKANE_ID } from '../typy.js'

const stanDomyslny = {

    sortowanieWedlug: "id_firmy",
    limit: 20,
    offset: 0,
    port: 7777,
    adresIP: "localhost",
    idSzukanejFirmy: 1,
    // adres : adresIP + "dupa" // nie mozna tak robic. pewnie w konstruktorze nie jest okreslona kolejnosc definiowania zmiennych
}
 const mozliweSortowania=["id_firmy", "nazwa", "miasto", "id_miasta","telefon","fax","nip","regon","krs","ekd","mail","wlasciciel","www","kod_pocztowy","ulica","id_ulicy","nr_domu",
 "id_nr_domu","nr_lokalu","id_wojewodztwo","wojewodztwo","id_stare_wojewodztwo","stare_wojewodztwo","id_powiat","powiat"];

 export default function KreatorZapytaniaAPI(stan = stanDomyslny, akcja) {
    switch (akcja.type) {
        case ZMIEN_SORTOWANIE:
            if (mozliweSortowania.includes(akcja.sortowanie)){
                // console.log("zmiana sortowania na nowe")
            return {
                ...stan, sortowanieWedlug: akcja.sortowanie
                }
            }
            else{ // to trzeba w ogole wrzucac? wydaje mi sie, ze nie, ale probuje cisnac narazie z tym
                // console.log("mozliwesortowania nie zawieraja (akcja.sortowanie")
                // console.log("akcja sortowanie to: " + akcja.sortowanie)
                // console.log(akcja);
                return stan;
            }
        case ZMIEN_SZUKANE_ID:
            return {
                ...stan, idSzukanejFirmy: akcja.szukaneId
            }
        default:
            return stan;
    }
}