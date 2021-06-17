import { useSelector } from 'react-redux';
import { call, put, select, take, takeEvery } from 'redux-saga/effects'

const apiUrl = "http://localhost:7777/id_firmy?limit=40"
//const apiUrll = useEffe

//firmySaga nasluchuje wszystkich akcji typu ZAPYTANIE_WEZ_FIRMY i dla kazdej uruchamia generator "przyniesFirmy", ktory probuje 
//sie polaczyc  za pomoca metody "wezOdApi" i co z tym robi? jesli polaczenie sie nawiaze uzywa yield put z akcja w srodku.
//akcja ma typ "ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_SUKCESEM" a do tego jest payload zawierajacy elementy pobrane przez wezOdApi.
// w innym przypadku oczywiscie jest inny typ. niezaleznie od rodzaju akcji, idziemy dalej do redux/reducery/firmy.js
function stworzApiURL(sortowanieWedlug) {
    return `http://localhost:7777/${sortowanieWedlug}id_firmy?limit=40`;
}
// function  APIURLCOMPONENT(props){
//     const sortowanie = useSelector(state=> state.firmy.sortowanieWedlug)
//     return(<></>);
// }

function wezOdApi() {
    //  const sortowanieWedlug = useSelector(state => state.firmy.sortowanieWedlug);
    //  console.log("SORTOWANIE WEDLUGGGG::::::::::::::::::::")
    //  console.log(sortowanieWedlug);
    //  const sortowanie = yield select (sortowanieWedlug);
    //const apiUrl2 = stworzApiURL(sortowanieWedlug);


    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).catch((error) => { throw error })
}
function* przyniesFirmy(akcja) {
    try {

        //  const dupablada = akcja;
        //  console.log("console.log(akcja.zapytanie):");
        //  console.log(akcja.zapytanie);
        //  console.log("console.log(akcja.ladunek):");
        //  console.log(akcja.ladunek);
        //  console.log("console.log(akcja.type):");
        //  console.log(akcja.type);
        //  console.log("dupa blada");
        //  console.log(dupablada);
        //  console.log("console.log(arguments)");
        //  console.log(arguments)

        // const getErrorr = (state) => state.firmy.blad;
        // console.log(getErrorr)
        // console.log("const error = yield take(getErrorr):::::::")
        // const error = yield take(getErrorr);

        // const zapytanieAPI = stworzApiURL(akcja.zapytanie);
        //console.log(zapytanieAPI);

        const sortowanieWedlug = (state) => state.firmy.sortowanieWedlug; // TO DZIALA.
        const sortowanie = yield select(sortowanieWedlug);
        console.log('SORTOWANIEEEEEE  z function* przyniesFirmy(akcja)')
        console.log(sortowanie);

        const apiUrl = `http://localhost:7777/${sortowanie}?limit=20`
           console.log("http://localhost:7777/nazwa?limit=123&nazwa=Us&order=DESC")


        // console.log(typeof(sortowanie))//string
        const firmy = yield call(wezOdApi, apiUrl); // tutaj wywoluje sie funkcje wezOdApi(apiUrl) w ten sposob. specyficzne, wiem :)
        yield put({ type: 'ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_SUKCESEM', firmy: firmy })
    } catch (error) {
        alert(error)
        yield put({ type: 'ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_NIEPOWODZENIEM', message: error.message })
    }
}

function* firmySaga() {
    //  console.log("from function* firmysaga():")
    //  console.log(arguments)

    yield takeEvery('ZAPYTANIE_WEZ_FIRMY', przyniesFirmy)
}

export default firmySaga;