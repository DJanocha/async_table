export const ZAPYTANIE_WEZ_FIRMY = "ZAPYTANIE_WEZ_FIRMY"
export const ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_SUKCESEM = "ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_SUKCESEM"
export const ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_NIEPOWODZENIEM= "ZAPYTANIE_WEZ_FIRMY_ZAKONCZONE_NIEPOWODZENIEM"
//typy powyzsze sa uzywane przez sage, gdyz kojarzone sa z akcjami asynchronicznymi (fetch data from api)



//ponizej stworzymy typy do akcji synchronicznych. adres url potrzebny do tworzenia zapytania (asynchronicznego) bedzie trzymany
// w stanie, ktory bedzie wlasnie synchroniczny i nie bedzie potrzebowal korzystania z redux saga.
export const ZMIEN_SORTOWANIE = "ZMIEN_SORTOWANIE"
export const ZMIEN_SZUKANE_ID = "ZMIEN_SZUKANE_ID"
export const AKTUALIZUJ_FILTR = "AKTUALIZUJ_FILTR"

