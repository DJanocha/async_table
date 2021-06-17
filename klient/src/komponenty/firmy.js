import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap'
import { wezFirmy } from '../redux/akcje/firmy';
import Pocztowka from './pocztowka';
import TabelaJSON from './TabelaJSON'
import { v4 as uuid } from 'uuid'
import firmyAPIURL from '../redux/reducery/firmyAPIURL.js'
import { zmienSortowanie } from '../redux/akcje/firmyAPIURL';
import { ZMIEN_SORTOWANIE } from '../redux/typy';
const Firmy = () => {
    // const [prototypZapytaniaAPI, setPrototypZapytaniaAPI] = useState({
    //     sortowanieWedlug: "nazwa",
    //limit: 20;
    //offset :50;
    //miasto: "Wa" 
    // to wszystko potem bedzie zaimplementowane. bedzie to siedzialo w stanie danego komponentu narazie, gdyz nie widze potrzeby
    //dzielenia go miedzy komponentami. wszakze tworzac np komponent z wybranymi juz "MOIMI KOMPONENTAMI", ktore wybralem z 
    //wyszukiwarki, ktora teraz sie zajmuje, nie chcialbym by korzystal on z tego linku. wiem, ze moze po prostu go nie dotykac,
    //ale dla uproszczenia narazie niech to  siedzi wlasnie tutaj i tylko renderowana tabela moze to zmieniac. 
    // })
    // const [sortujWg, setSortujWg] = useState("id_firmy");
    // const zmienSortowania
    const dispatch = useDispatch();
    const firmy = useSelector(state => state.firmy.firmy)
    const blad = useSelector(state => state.firmy.blad)
    // const adresIPjednejFirmy = useSelector(state => state.firmy.adresAPIjednaFirma)
    //const adresIPwieluFirm = useSelector(state => state.firmy.adresAPIwieleFirm)
    const sieWczytuje = useSelector(state => state.firmy.sieWczytuje)
    const [widokFirm, setWidokFirm] = useState("tabela") //true- uzywaj pocztowek ||  false- uzywaj tabeli (efekt szukania firm)
    const przelaczWidok = () => {
        setWidokFirm(widokFirm === "tabela" ? "pocztowki" : "tabela")
    }
    useEffect(() => { dispatch(wezFirmy(firmy)) }, [dispatch]); //wsadz dispatch do nawiasow ( o to chodzi w errorze)
    // const [stanAPIURL, dispatchAPIURL] = useReducer(KreatorZapytaniaAPI,stanDomyslny)
    // const stan




    //dobra, pobawmy sie tutaj z sortowaniem. zacznijmy od zmiany adresu, ktory sie wyswietla w czerwonym przycisku u gory
    const a2 = useSelector(state => state.firmyAPIURL)
    let adresURLAPI = `http://${a2.adresIP}:${a2.port}/${a2.sortowanieWedlug}?limit=${a2.limit}&offset=${a2.offset}`;
    // useEffect(() => {
    //     adresURLAPI = `http://${a2.adresIP}:${a2.port}/${a2.sortowanieWedlug}?limit=${a2.limit}&offset=${a2.offset}`;
    // }, [dispatch])
    // function  zmienSortowanieNaEKD(){
    //     dispatch(zmienSortowanie("ekd"))
    // }
     const zmienSortowanie =(dupa)=>{
        dispatch({
            type: ZMIEN_SORTOWANIE,
            sortowanie: dupa,
        })
    }
    // const zmienSortowanie = () => {
    //     dispatch({
    //         type: ZMIEN_SORTOWANIE,
    //         sortowanie: "wojewodztwo"
    //     })
    // }


    //tutaj wyswietlmy sobie aktualny adres ip url, ktory przechowuje state.adresurl czy cos. dupa. todo. edit zaraz
    return (
        <>
            <Button color="success" onClick={przelaczWidok}> Zmień widok </Button>
            <Button color="danger" onClick={()=>{zmienSortowanie("mail")}}> {adresURLAPI}</Button>
            {sieWczytuje && <p>Wczytywanie danych...</p>}
            {firmy.length > 0 && widokFirm === "pocztowki" && firmy.map((firma) => (
                <Pocztowka firma={firma} key={uuid()} />
            ))}
            {firmy.length > 0 && widokFirm === "tabela" && <TabelaJSON sortuj={zmienSortowanie} dane={firmy} />}///
            {/* {firmy.length > 0 && widokFirm==="tabela" && <TabelaJSON  podejrzyjZapytanie={stanAPIURL} edytujZapytanie={dispatchAPIURL}dane={firmy} />}/// */}
            {firmy.length === 0 && !sieWczytuje && <p>nie znaleziono zadnej firmy</p>}
            {blad && !sieWczytuje && { blad }}
        </>)
}
export default Firmy;