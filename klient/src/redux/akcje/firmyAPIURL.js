import {ZMIEN_SORTOWANIE, ZMIEN_SZUKANE_ID} from '../typy'

export function zmienSortowanie(noweSortowanie){
    // console.log(arguments)
    // console.log("w sordku akcji jest typ: ZMIEN_SORTOWANIE, a sortowanie to: " + noweSortowanie)
    return {
        type: ZMIEN_SORTOWANIE,
        sortowanie: noweSortowanie
    }
}
export function zmienSzukaneID(noweID){
    return{
        type: ZMIEN_SZUKANE_ID,
        szukaneId: noweID
    }
}