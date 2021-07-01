import { dodajFiltr } from '../akcje/firmyAPIURL.js';
import { ZMIEN_SORTOWANIE, ZMIEN_SZUKANE_ID, AKTUALIZUJ_FILTR} from '../typy.js'

const stanDomyslny = {

    sortowanieWedlug: "id_firmy",
    ascdesc: "ASC",
    limit: 20,
    offset: 0,
    port: 7777,
    adresIP: "localhost",
    idSzukanejFirmy: 1,
    szukaneKolumny: []
    // adres : adresIP + "dupa" // nie mozna tak robic. pewnie w konstruktorze nie jest okreslona kolejnosc definiowania zmiennych
}
const mozliweSortowania = ["id_firmy", "nazwa", "miasto", "id_miasta", "telefon", "fax", "nip", "regon", "krs", "ekd", "mail", "wlasciciel", "www", "kod_pocztowy", "ulica", "id_ulicy", "nr_domu",
    "id_nr_domu", "nr_lokalu", "id_wojewodztwo", "wojewodztwo", "id_stare_wojewodztwo", "stare_wojewodztwo", "id_powiat", "powiat"];

export default function KreatorZapytaniaAPI(stan = stanDomyslny, akcja) {
    switch (akcja.type) {
        case ZMIEN_SORTOWANIE:
            if (mozliweSortowania.includes(akcja.sortowanie)) {
                // console.log("zmiana sortowania na nowe")

                if (stan.sortowanieWedlug === akcja.sortowanie) {
                    return {
                        ...stan, ascdesc: stan.ascdesc==="DESC"? "ASC" : "DESC"
                    }
                }
                else {
                    return {
                        ...stan, sortowanieWedlug: akcja.sortowanie, ascdesc:"ASC"
                    }
                }
            }
            else { // to trzeba w ogole wrzucac? wydaje mi sie, ze nie, ale probuje cisnac narazie z tym
                // console.log("mozliwesortowania nie zawieraja (akcja.sortowanie")
                // console.log("akcja sortowanie to: " + akcja.sortowanie)
                // console.log(akcja);
                return stan;
            }
        case ZMIEN_SZUKANE_ID: // moze zaraz to wywalimy, bo nie jestem przekonany co do tego
            return {
                ...stan, idSzukanejFirmy: akcja.szukaneId
            }
        case AKTUALIZUJ_FILTR:
            const {filtr, wartoscFiltru} = akcja
            if (!mozliweSortowania.includes(filtr)){ // jesli u nas nie ma tablicy, po ktorej chcemy sortowac(mozliweSortowania)
                return stan; // nic nie rob i zwroc stan poprzedni
            } else { // jesli jednak jest
                return {
                    ...stan, szukaneKolumny: {filtr, wartoscFiltru}
                }
            }
        default:
            return stan;
    }
}