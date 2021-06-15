import React, {Button, Card, CardText, CardSubtitle, CardBody, CardHeader, CardTitle} from 'reactstrap'
import { useState } from 'react'

import styles from './postcard.module.css'
const Pocztowka = (props) => { //props.firma <- tu znajduja sie informacje o firmie (id_firmy, nazwa, miejscowosc itd)
    //wiele pol jest nullowych, wiec mozna by je w ogole pominac przy wyswietlaniu zawartosci.
    //najlepiej bedzie jesli posluzymy sie metoda map(), by zwracala zawartosc kazdego z pola props.firma, jesli takowy jest NIEPUSTY
   /* return<div>
    <Container className={StyleSheet.postcard}>
        <Row><Col>ID: {props.firma.id_firmy}</Col></Row>
        <Row><Col>nazwa: {props.firma.nazwa}</Col></Row>
        <Row><Col>miasto: {props.firma.miasto}</Col></Row>
        <Row><Col>telefon: {props.firma.telefon}</Col></Row>
        <Row><Col>email: {props.firma.email}</Col></Row>
        <Button> WIĘCEJ INFO</Button>
    </Container>
    </div>
}*/
    const [pokazPuste, setPokazPuste] = useState(false)
    const pokazLubUkryjPustePola = ()=>{
        console.log(props.firma.nazwa)
        const dupaa= kluczeFirmy.map((klucz)=>{
            return `${[klucz]}  ma tyle znakow: ${props.firma[klucz] && props.firma[klucz].toString().trim().length}`
        })
        console.log(dupaa)
        setPokazPuste(!pokazPuste);
    }
    const kluczeFirmy = Object.keys(props.firma).map((informacja)=>{
        return informacja;
    })
    const wartosciFirmy = Object.values(props.firma).map((info) => {
        return info;
    })
    const iloscKluczy = kluczeFirmy.length;///
    console.log(wartosciFirmy);
    return<div>
        <Card>
            <CardHeader styles={styles.cardHeader}>{props.firma.nazwa}</CardHeader>
            <CardBody>
                <CardTitle tag="h5">{props.firma.ekd}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{props.firma.miasto}</CardSubtitle>
                <CardText>
                    {kluczeFirmy.map((wartosc)=>{
                    //     return<div>
                    //     <b> {wartosc}</b> : {props.firma[wartosc]} 
                    //  </div>;



                        if (pokazPuste){
                            return <div>
                           <b> {wartosc}</b> : {props.firma[wartosc]} 
                        </div>;
                        }
                        else{
                            return props.firma[wartosc] && <div>
                           <b> {wartosc}</b> : {props.firma[wartosc]} 
                        </div>;
                        }
                        
                    })}
                {/* <p><b>tel:</b>&emsp;{props.firma.telefon}</p>
                <p><b>fax:</b>&emsp;{props.firma.fax}</p>
                <p><b>@:</b>&emsp;{props.firma.mail}</p>
                <p><b>www:</b>&emsp;{props.firma.www}</p> */}
                </CardText>
                {pokazPuste && <Button color="danger"  onClick={pokazLubUkryjPustePola}> Mniej info </Button>}

                {!pokazPuste && <Button color="success" onClick={pokazLubUkryjPustePola}> Więcej info</Button> }
            </CardBody>
        </Card>
    </div>
}
export default Pocztowka;