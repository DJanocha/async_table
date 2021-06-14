import * as typy from '../typy'


const stanDomyslny = {
    firmy: [],
    czyWczytuje: false,
    blad: null
};
export default function Firmy(stan = stanDomyslny, akcja) {
    switch (akcja.type) {
        case typy.ZAPYTANIE_WEZ_FIRMY:
            return { ...stan,  
                czyWczytuje: true }

        case typy.ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_SUKCESEM:
            return { ...stan, 
                firmy: akcja.firmy, 
                czyWczytuje: false}

        case typy.ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_NIEPOWODZENIEM:
            return { ...stan, 
                blad: akcja.message, 
                czyWczytuje: false 
            }
        default:
            return stan;
    }
}