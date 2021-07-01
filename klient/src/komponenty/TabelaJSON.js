import { useState } from 'react'
//import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom'  <- cos mi sie wkradlo :D
import { Table , Button} from 'reactstrap'
import { v4 as uuid } from 'uuid'

import * as css from './TabelaJSON.module.css'

const TabelaJSON = (props) => {
    const obsluzKlikniecieKolumny = (klucz) => {
        props.sortuj(klucz);
        //alert(klucz);
        console.log(props);
    }
    const obsluzKlikniecieRzedu = (rzad) => {
        const klucze = zdobadzKlucze();
        klucze.map((klucz) => {
            return console.log(rzad[klucz])
        })
        console.log(rzad.id_firmy);
    }
    const zdobadzKlucze = () => {
        return Object.keys(props.dane[0]);
    }
    const RenderujKlucze = () => {
        const klucze = zdobadzKlucze();
        return klucze.map((klucz) => {
            return <th key={uuid()} className={css.kolumna} onClick={() => { obsluzKlikniecieKolumny(klucz) }}>{klucz.toUpperCase()}</th>
        })
    }
    const RenderujPaskiWyszukiwania = () => {
        const klucze = zdobadzKlucze();
        return klucze.map((klucz) => {
            return <th key={uuid()}> <input type="text" /> </th>
        });
    }

    const RenderujRzad = (props) => {
        const klucze = Object.keys(props.dane);
        return klucze.map((klucz) => {
            return <td key={uuid()} onClick={() => { obsluzKlikniecieRzedu(props.dane) }}>{props.dane[klucz]}</td>
        });
    }
    const RenderujRzedy = (props) => {
        // const data = Array.from(props.data);
        return props.dane.map((rzad) => {
            return <tr className={css.rzad} key={uuid()}><RenderujRzad dane={rzad} klucze={zdobadzKlucze()} /></tr>
        });
    }
    const RenderujUstawieniaTabeli = () => {

    }
    const RenderujPomocnyKomponent=()=>{
        return(
            <div className={css.pomoce}>
                <Button color="danger">w pomocach</Button>
                <form>
                    
                    <label>napisz cos: <input type="text" name="name"></input></label>
                    <input type="submit" name="wyslij"></input>
                </form>
            </div>)
    }
    return (
        <>
            <RenderujPomocnyKomponent />
            <Table>
                <thead>
                    <tr><RenderujKlucze /></tr>
                </thead>
                <tbody>
                    <tr><RenderujPaskiWyszukiwania /></tr>
                    <RenderujRzedy dane={props.dane} />{/*cala tabele przekazujemy*/}
                </tbody>
            </Table>

        </>
    )
}
export default TabelaJSON;