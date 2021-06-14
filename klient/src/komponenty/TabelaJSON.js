import { useState } from 'react'
//import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom'  <- cos mi sie wkradlo :D
import { Table } from 'reactstrap'
import { v4 as uuid } from 'uuid'

const TabelaJSON = (props) => {
    const zdobadzKlucze = () => {
        return Object.keys(props.dane[0]);
    }
    const RenderujKlucze = () => {
        const klucze = zdobadzKlucze();
        return klucze.map((klucz) => {
            return <th key={uuid()}>{klucz.toUpperCase()}</th>
        })
    }
    const RenderujRzad = (props) => {
        const klucze = Object.keys(props.dane);
        return klucze.map((klucz) => {
            return <td key={uuid()}>{props.dane[klucz]}</td>
        });
    }
    const RenderujRzedy = (props) => {
       // const data = Array.from(props.data);
        return props.dane.map((rzad) => {
            return <tr key={uuid()}><RenderujRzad dane={rzad} klucze={zdobadzKlucze()} /></tr>
        });
    }
    return (
        <Table>
            <thead>
                <tr><RenderujKlucze /></tr>
            </thead>
            <tbody>
                <RenderujRzedy dane={props.dane} />{/*cala tabele przekazujemy*/}
            </tbody>
        </Table>
    )
}
export default TabelaJSON;