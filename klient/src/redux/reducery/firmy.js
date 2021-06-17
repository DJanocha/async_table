import * as typy from '../typy'


const stanDomyslny = {
    firmy: [],
    czyWczytuje: false,
    blad: null,
    sortowanieWedlug: "nazwa"//to do wywalenia

}

    // },
    // adresAPIjednaFirma: `http://${adresIP}:${port}/id_firmy/${idSzukanejFirmy}`
// };
export default function Firmy(stan = stanDomyslny, akcja) {
    switch (akcja.type) {
        // case typy.ZMIEN_SORTOWANIE:
        //     return {
        //         ...stan,
        //         sortowanieWedlug: akcja.sortowanieWedlug
        //     }
        case typy.ZAPYTANIE_WEZ_FIRMY:
            return {
                ...stan,
                czyWczytuje: true
            }

        case typy.ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_SUKCESEM:
            return {
                ...stan,
                firmy: akcja.firmy,
                czyWczytuje: false
            }

        case typy.ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_NIEPOWODZENIEM:
            return {
                ...stan,
                blad: akcja.message,
                czyWczytuje: false
            }
        default:
            return stan;
    }
}