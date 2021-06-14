 import {call, put, takeEvery } from 'redux-saga/effects'

 const apiUrl= "http://localhost:7777/id_firmy/1"

//firmySaga nasluchuje wszystkich akcji typu ZAPYTANIE_WEZ_FIRMY i dla kazdej uruchamia generator "przyniesFirmy", ktory probuje 
//sie polaczyc  za pomoca metody "wezOdApi" i co z tym robi? jesli polaczenie sie nawiaze uzywa yield put z akcja w srodku.
//akcja ma typ "ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_SUKCESEM" a do tego jest payload zawierajacy elementy pobrane przez wezOdApi.
// w innym przypadku oczywiscie jest inny typ. niezaleznie od rodzaju akcji, idziemy dalej do redux/reducery/firmy.js

 function wezOdApi(){
     return fetch(apiUrl, {
         method: 'GET',
         headers: {
             'Content-Type': 'application/json'
         }
     }).then(response => response.json()).catch((error) => {throw error})
 }
 function* przyniesFirmy(){
     try {
        const firmy = yield call(wezOdApi);
        yield put ({type: 'ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_SUKCESEM', firmy: firmy})
     } catch (error) {
         alert(error)
         yield put ({type: 'ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_NIEPOWODZENIEM', message: error.message})
     }
 }

 function* firmySaga(){
     yield takeEvery('ZAPYTANIE_WEZ_FIRMY', przyniesFirmy) 
 }

 export default firmySaga;