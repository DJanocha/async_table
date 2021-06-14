import * as typy from '../typy'

export function wezFirmy(firmy){
    return {
        type: typy.ZAPYTANIE_WEZ_FIRMY,
        ladunek: firmy,
    }
}