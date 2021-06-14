import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'reactstrap'
import {wezFirmy} from '../redux/akcje/firmy';
import Pocztowka from './pocztowka';
import TabelaJSON from './TabelaJSON'
const Firmy = () => {
    const dispatch = useDispatch();
    const firmy = useSelector(state => state.firmy.firmy)
    const blad = useSelector(state => state.firmy.blad)
    const sieWczytuje = useSelector(state => state.firmy.sieWczytuje)
    const [stanPrzycisku, ustawStanPrzycisku] = useState(false) //true- uzywaj pocztowek; false- uzywaj tabeli (efekt szukania firm)
    const przelaczPrzycisk =() => {ustawStanPrzycisku(!stanPrzycisku)}
    useEffect(()=>{dispatch(wezFirmy())}, [dispatch]); //wsadz dispatch do nawiasow ( o to chodzi w errorze)

    return(
    <> 
    <Button color="success" onClick={przelaczPrzycisk}> Zmień widok </Button>
        {sieWczytuje && <p>Wczytywanie danych...</p>}
        {firmy.length > 0 &&   stanPrzycisku===true && firmy.map((firma)=>(
            <Pocztowka firma={firma} key={firma.id_firmy} />
        ))}
        {firmy.length > 0 && stanPrzycisku===false && <TabelaJSON dane={firmy} />}
        {firmy.length===0 && !sieWczytuje && <p>nie znaleziono zadnej firmy</p>}
        {blad && !sieWczytuje && {blad}}
    </>)
    } 
export default Firmy;