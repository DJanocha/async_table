import React, {Button, Card, CardText, CardSubtitle, CardBody, CardHeader, CardTitle} from 'reactstrap'

import styles from './postcard.module.css'
const Pocztowka = (props) => {
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

    return<div>
        <Card>
            <CardHeader styles={styles.cardHeader}>{props.firma.nazwa}</CardHeader>
            <CardBody>
                <CardTitle tag="h5">{props.firma.nazwa}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{props.firma.miasto}</CardSubtitle>
                <CardText>
                <p><b>tel:</b>&emsp;{props.firma.telefon}</p>
                <p><b>fax:</b>&emsp;{props.firma.fax}</p>
                <p><b>@:</b>&emsp;{props.firma.mail}</p>
                <p><b>www:</b>&emsp;{props.firma.www}</p>
                </CardText>
                <Button color="success"> Więcej info</Button>
            </CardBody>
        </Card>
    </div>
}
export default Pocztowka;