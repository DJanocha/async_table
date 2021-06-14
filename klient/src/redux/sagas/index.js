import {all} from 'redux-saga/effects'

import firmySaga from './firmySaga'

export default function* glownaSaga(){
    yield all([
        firmySaga(),
    ])
}
//glowna saga ustawia wszystkie sagi, by ciagle nasluchiwaly w tle akcji, do ktorych sa powiazane