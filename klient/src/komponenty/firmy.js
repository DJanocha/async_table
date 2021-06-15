import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'reactstrap'
import {wezFirmy} from '../redux/akcje/firmy';
import Pocztowka from './pocztowka';
import TabelaJSON from './TabelaJSON'
import { v4 as uuid } from 'uuid'
const Firmy = () => {
    const dispatch = useDispatch();
    const firmy = useSelector(state => state.firmy.firmy)
    const blad = useSelector(state => state.firmy.blad)
    const adresIPjednejFirmy = useSelector(state => state.firmy.adresAPIjednaFirma)
    const adresIPwieluFirm = useSelector(state => state.firmy.adresAPIwieleFirm)
    const sieWczytuje = useSelector(state => state.firmy.sieWczytuje)
    const [widokFirm, setWidokFirm] = useState("tabela") //true- uzywaj pocztowek ||  false- uzywaj tabeli (efekt szukania firm)
    const przelaczWidok =() => {
        setWidokFirm(widokFirm==="tabela" ? "pocztowki" : "tabela") 
    }
    useEffect(()=>{dispatch(wezFirmy())}, [dispatch]); //wsadz dispatch do nawiasow ( o to chodzi w errorze)

    return(
    <> 
    <Button color="success" onClick={przelaczWidok}> Zmień widok </Button>
        {sieWczytuje && <p>Wczytywanie danych...</p>}
        {firmy.length > 0 &&   widokFirm==="pocztowki" && firmy.map((firma)=>(
            <Pocztowka firma={firma} key={uuid()} />
        ))}
        {firmy.length > 0 && widokFirm==="tabela" && <TabelaJSON dane={firmy} />}///
        {firmy.length===0 && !sieWczytuje && <p>nie znaleziono zadnej firmy</p>}
        {blad && !sieWczytuje && {blad}}
    </>)
    } 
export default Firmy;