import { combineReducers } from 'redux'
import firmy from './firmy'
import firmyAPIURL from './firmyAPIURL'

//przechowujemy tu wszystkie reducery po prostu. bedzie mozna je wszystkie latwiej umiescic w "store".
const rootReducer = combineReducers({
firmy,
firmyAPIURL
})

export default rootReducer;