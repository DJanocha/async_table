import { combineReducers } from 'redux'
import firmy from './firmy'

//przechowujemy tu wszystkie reducery po prostu. bedzie mozna je wszystkie latwiej umiescic w "store".
const rootReducer = combineReducers({
firmy: firmy,
})

export default rootReducer;