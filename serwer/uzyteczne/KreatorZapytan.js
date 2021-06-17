import { json } from 'express';
import dbconfig from '../dbconfig.js'

class KreatorZapytan {
    constructor() {
        this.koncowyStringZapytaniaSQL = "";
        this.porownajPrzyUzyciuZnakuRownaSie = {
            "databaseName": "firmy",
            "orderBy": "id_firmy",
            "dir": "ASC",
            "offset": 0,
            "limit": 15,
            "zaznaczoneKolumny": []
        };
        this.ID = {
        }
        this.porownajPrzyUzyciuLike = {};
        this.mozliweKolumny = undefined
    }

    async wezStringZapytaniaSQL(parametryZRequestParams, parametryZRequestQuery) {
        // console.log("mozliwe kolumny przed zainicjowaniem:")
        // console.log(this.mozliweKolumny)
        await this.zdobadzNazwyKolumnPotrzebneDoPorownywania();
        console.log("MOZLIWE KOLUMNY po zainicjalizowaniu")
        console.log(this.mozliweKolumny);
        await this.rozdysponujElementyZapytaniaDoBazy(parametryZRequestParams, parametryZRequestQuery);
        // this.wylisujWszystko();//dla testu // rozdysponowanie wszystkiego nie dziala narazie!!!
        this.zapytanie_select();
        this.zapytanie_from();
        this.zapytanie_where();
        this.zapytanie_orderBy();
        this.zapytanie_direction();
        this.zapytanie_offset();
        this.zapytanie_limit();
        this.zakonczZapytanieSrednikiem();
        return this.koncowyStringZapytaniaSQL;
    }


    async zdobadzNazwyKolumnTabeli() {
        const kolumny = await dbconfig.query("SELECT column_name FROM INFORMATION_SCHEMA.columns WHERE table_name = 'firmy';").catch(console.log);
        //console.log(kolumny.rows);
        return kolumny.rows;
    }
    async zdobadzNazwyKolumnPotrzebneDoPorownywania() {//dziala narazie
        const _mozliweKolumny = await this.zdobadzNazwyKolumnTabeli(); // bierzemy z tabeli(z bazy danych) info jakie w ogole sa kolumy w niej
        // console.log('mozliwe kolumny w metodzie zdobadznazwy*()):')
        // console.log(this.mozliweKolumny)
        // console.log("test1")
        var nazwyKolumn = _mozliweKolumny.map((col) => { // chcialem nie tworzyc dwoch roznych tabeli, ale sie pluje przy map na async func
            return col.column_name; // postgres zwraca tablice z nazwami tabeli, wiec column_name jest z postgresa. nie mozna tego na polski przetlumaczyc, bo sie posypie.
        })
        this.mozliweKolumny = nazwyKolumn;
        // console.log("test1")
        console.log("kurdelebleeeeeee:")
        console.log(this.mozliweKolumny)

        for (var i in nazwyKolumn) {

            const elem = nazwyKolumn[i];
            if (elem[0] === 'i' && elem[1] === 'd' && elem[2] === '_') //jesli element (nazwa kolumny z tabeli) zaczyna sie od "id_"  wtedy:
            {
                this.ID[elem] = undefined; //wrzuc ja niezainicjalizowana (gorzej niz pusta, aczkolwiek istniejaca) do this.ID
            }
            else {
                this.porownajPrzyUzyciuLike[elem] = undefined;//lub do porownajPrzyUzyciuLike. wiemy dzieki temu, jakie rzeczy mozemy porownywac w ogole w query
            }
        }
        // console.log("tutaj sprawdzamy czy dobrze sie dodaly kolumny do klasy (comparelike, compareexact itd):") 
        // this.wylisujWszystko()   //wyglada OK, hmmm...
        // console.log("test1")

    }

    async rozdysponujPojedynczyElement(klucz, wartosc) {
        console.log("\n\n\n\n\n\n\n\n\n\n")
        this.wylisujWszystko();//test
        console.log("\n\n\n\n\n\n\n\n\n\n")

        console.log("klucz : wartosc:")
        console.log(klucz + " : " + wartosc);
        const kolumny = this.mozliweKolumny;
        // console.log("const kolumny = this.mozliwekolumny:")
        // console.log(kolumny)
        // console.log("zaalokujmy element " + klucz + " : " + wartosc)
        if (klucz in this.porownajPrzyUzyciuLike) {
            this.porownajPrzyUzyciuLike[klucz] = wartosc;
            console.log("Znaleziono obiekt " + klucz + " w this.porownajPrzyUzyciuLike. Zaktualizowano obiekt.")
        } else if (klucz in this.porownajPrzyUzyciuZnakuRownaSie) { // 
            console.log("a w compareexact sa takie elementy: ")
            console.log(this.porownajPrzyUzyciuZnakuRownaSie["dir"] + " to jest dir")
            console.log(this.porownajPrzyUzyciuZnakuRownaSie["orderBy"] + " to jest orderBy")
            console.log(this.porownajPrzyUzyciuZnakuRownaSie["offset"] + " to jest offset")
            console.log(this.porownajPrzyUzyciuZnakuRownaSie["limit"] + " to jest limit")
            //a sprawdza takie rzeczy ogolnie :
            // this.porownajPrzyUzyciuZnakuRownaSie = {
            //     "databaseName": "firmy",
            //     "orderBy": "id_firmy",
            //     "dir": "ASC",
            //     "offset": 0,
            //     "limit": 15,
            //     "zaznaczoneKolumny": []
            // };
            // console.log(typeof (this.porownajPrzyUzyciuZnakuRownaSie[klucz]))
            // if (wartosc in kolumny){
            // this.porownajPrzyUzyciuZnakuRownaSie[klucz] = wartosc;// jesli klucz to string, uzywaj [] a nie kropki, bo nie zadziala!!!
            // console.log("Znaleziono obiekt "+klucz+" w this.porownajPrzyUzyciuZnakuRownaSie. Zaktualizowano obiekt.")
            // }
            switch (klucz) {
                case 'orderBy':
                    console.log("klucz to orderBy vartosc to: " + wartosc)

                    // console.log("if (klucz === orderBy) ")
                    // console.log(klucz)
                    // console.log(wartosc);
                    // console.log("kolumny:")
                    // console.log(kolumny);
                    // if (kolumny.includes(wartosc)) console.log("kolumny.includes(wartosc)")
                    if (kolumny.includes(wartosc)) { // ORAZ jesli wartosc do sortowana podana przez uzytkownika to kolumna wg ktorej mozna sortowac
                        // console.log("if wartosc in kolumny")
                        this.porownajPrzyUzyciuZnakuRownaSie[klucz] = wartosc;// jesli klucz to string, uzywaj [] a nie kropki, bo nie zadziala!!!
                        // console.log("Znaleziono obiekt " + klucz + " w this.porownajPrzyUzyciuZnakuRownaSie. Zaktualizowano obiekt.")
                    } else {
                        console.log("watosc nie jest w kolumny")
                    }
                    break;
                case 'dir':
                    // const dirrrrr = "";
                    // const toUpperCaseDir = (""+wartosc).toUpperCase();
                    // console.log("klucz to dir vartosc to: " + toUpperCaseDir)
                    // console.log("\n\n\n\n\n\n\n" + toUpperCaseDir+"\n\n\n\n\n\n\n")
                    if (wartosc.toUpperCase() === "DESC") this.porownajPrzyUzyciuZnakuRownaSie[klucz] = wartosc.toUpperCase();
                    break;
                case 'offset':
                    console.log("klucz to offset vartosc to: " + wartosc)

                    const liczboweOffset = Number(wartosc);
                    console.log("ustawiamy taki offset: " + liczboweOffset)//test
                    if (liczboweOffset) this.porownajPrzyUzyciuZnakuRownaSie["offset"] = wartosc;//jesli podano liczbe, ustaw ja jako wartosc offset
                    else { console.log("podana wartosc parametru 'offset' to nie liczba niestety....") };
                    console.log("ustawil sie taki offset: " + this.porownajPrzyUzyciuZnakuRownaSie["offset"])
                    break;
                case "limit":
                    console.log("klucz to limit vartosc to: " + wartosc)

                    const liczboweLimit = Number(wartosc);
                    if (liczboweLimit) this.porownajPrzyUzyciuZnakuRownaSie["limit"] = wartosc;//jesli podano liczbe, ustaw ja jako wartosc offset
                    else { console.log("podana wartosc parametru 'limit' to nie liczba niestety....") };
                    break;
                case 'zaznaczoneKolumny':
                    break;
                default:
                    break;

            }

        } else if (klucz in this.ID) {
            this.ID[klucz] = wartosc;
            console.log("Znaleziono obiekt " + klucz + " w this.ID. Zaktualizowano obiekt.")
        } else { console.log("Bledne zapytanie (" + klucz + " : " + wartosc + ")!") }
    }
    //tutaj teraz grzebiemy
    async rozdysponujElementyZapytaniaDoBazy(parametryZRequestParams, parametryZRequestQuery) { // naraize tylko req.params bierze(prawie), req.query do zrobienia
        //console.log("for (var i in parametryZRequestParams){     ggggggggggggggggggggggggggggggggggggggggggg")

        for (var i in parametryZRequestParams) {
            // console.log(parametryZRequestParams);
            // console.log(i);
            // console.log("czy wystepuje gdzies? sprawdzmy")
            // if (i in this.porownajPrzyUzyciuLike) console.log("w porownajPrzyUzyciuLike")
            // else if (i in this.porownajPrzyUzyciuZnakuRownaSie) console.log("w porownajPrzyUzyciuZnakuRownaSie")
            // else if (i in this.ID) console.log("w ID")
            // else console.log("nigdzie")
            // console.log("parametr z req.params:")
            // console.log(i + " : " + parametryZRequestParams[i]);
            this.rozdysponujPojedynczyElement(i, parametryZRequestParams[i]);
        }
        // console.log("for (var i in parametryZRequestQuery){")
        for (var i in parametryZRequestQuery) {
            // console.log(i);
            // console.log("czy wystepuje gdzies? sprawdzmy")
            // if (i in this.porownajPrzyUzyciuLike) console.log("w porownajPrzyUzyciuLike")
            // else if (i in this.porownajPrzyUzyciuZnakuRownaSie) console.log("w porownajPrzyUzyciuZnakuRownaSie")
            // else if (i in this.ID) console.log("w ID")
            // else console.log("nigdzie")
            // console.log("parametr z req.query:")
            // console.log(i + " : " +parametryZRequestQuery[i]);
            this.rozdysponujPojedynczyElement(i, parametryZRequestQuery[i]);
        }
    }
    wylisujWszystko() {
        console.log("\n\n\n\nthis.porownajPrzyUzyciuZnakuRownaSie::::::::::::::::::::::::::::::::::::::::::::::;;");
        for (var a in this.porownajPrzyUzyciuZnakuRownaSie) {
            console.log(a + " : " + this.porownajPrzyUzyciuZnakuRownaSie[a]);
        }
        console.log("this.porownajPrzyUzyciuLike::::::::::::::::::::::::::::::::::::::::::::::;;");
        for (a in this.porownajPrzyUzyciuLike) {
            console.log(a + " : " + this.porownajPrzyUzyciuLike[a]);
        }
        console.log("this.ID::::::::::::::::::::::::::::::::::::::::::::::;;");
        for (a in this.ID) {
            console.log(a + " : " + this.ID[a]);
        }
        console.log("koniec wyswietlania listy wartosci do uzycia w query! \n\n\n")
    }
    zapytanie_select() {
        let wynik = "SELECT ";
        if (this.porownajPrzyUzyciuZnakuRownaSie['zaznaczoneKolumny'].length < 1) //dalem ===[], a taka nie byla, wiec byla "niepusta" ale 0 elementwo, wiec
        //nawet napis "select" ucielo :D
        {
            wynik += "* "
            //  console.log("PUSTA TABLICA SELECTED COLUMNS --------------------------------");
        }
        else {
            // console.log("TAABLICA NIE JEST PUSTA +++++++++++++++++++++++++++++++++++")
            // console.log(this.porownajPrzyUzyciuZnakuRownaSie['zaznaczoneKolumny']);
            for (let a in this.porownajPrzyUzyciuZnakuRownaSie.zaznaczoneKolumny) {
                // console.log(a);
                wynik += a + ", ";
            }
            wynik += wynik.slice(0, -2); //dla kazdego elementu dodawaj po nim przecinki,
            // ale potem usun przecinek i spacje zza ostatniego, zeby nie bylo ich tam
        }
        this.koncowyStringZapytaniaSQL = wynik;
    }
    zapytanie_from() {
        this.koncowyStringZapytaniaSQL += "FROM " + this.porownajPrzyUzyciuZnakuRownaSie.databaseName + " "
    }
    zapytanie_where() {
        let zdefiniowaneElementyDotyczaceCzesci_where = 0;
        let whereQueryString = "";

        // console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD:");
        // console.log(this.porownajPrzyUzyciuLike);
        for (let whereElem in this.porownajPrzyUzyciuLike) {
            if (this.porownajPrzyUzyciuLike[whereElem] === undefined) {
                // console.log(whereElem + " is undefined");
            } else {

                zdefiniowaneElementyDotyczaceCzesci_where++;
                whereQueryString += whereElem + " LIKE '" + this.porownajPrzyUzyciuLike[whereElem] + "%' AND "
            }
        } // {"nazwa" : "D"} => WHERE nazwa like "D%" AND  <- dla kazdego elementu, a potem z calosci stringa usun 4 znaki "AND ".
        //dla zera w ogole nie wchodz w klauzule where
        //DUPA TERAZ TUTAJ TO DODAJJ (ODEJMOWANIE OSTATNIEGO AND'A)!!!!!!!!!!!!
        if (zdefiniowaneElementyDotyczaceCzesci_where > 0) {
            whereQueryString = "WHERE " + whereQueryString;
            whereQueryString = whereQueryString.slice(0, -4); //o 4 ucinasz z prawej strony ten string bo "AND " to 4 znaki
        }
        this.koncowyStringZapytaniaSQL += whereQueryString;



    }
    zapytanie_orderBy() {
        // console.log("this.porownajPrzyUzyciuZnakuRownaSie.orderBy:")
        // console.log(this.porownajPrzyUzyciuZnakuRownaSie.orderBy)

        this.koncowyStringZapytaniaSQL += "ORDER BY " + this.porownajPrzyUzyciuZnakuRownaSie.orderBy + " ";
    }
    zapytanie_direction() {
        this.koncowyStringZapytaniaSQL += this.porownajPrzyUzyciuZnakuRownaSie.dir + " ";
    }
    zapytanie_offset() {
        this.koncowyStringZapytaniaSQL += "OFFSET " + this.porownajPrzyUzyciuZnakuRownaSie.offset + " ROWS "
    }

    zapytanie_limit() {
        this.koncowyStringZapytaniaSQL += "LIMIT " + this.porownajPrzyUzyciuZnakuRownaSie.limit + " ";
    }
    zakonczZapytanieSrednikiem() {
        this.koncowyStringZapytaniaSQL += ";";
    }
    async uruchomZapytanie() {
        const rezultat = await dbconfig.query(this.koncowyStringZapytaniaSQL).catch(console.log);
        return rezultat.rows;
    }
}

export default KreatorZapytan;