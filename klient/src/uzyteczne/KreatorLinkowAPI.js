//przyklad linku to : http://localhost:7777/id_firmy?limit=20&nazwa=DA
//serwer to juz umie interpretowac. ze strony frontendu musimy stworzyc klase, ktora te linki bedzie tworzyc
//zaleznie od naszego zapotrzebowania (np sortowanie zmienmy na sortowanie wd miasta lub zmienmy limit, moze nawet port i localhost
//na cos innego
//co bedzie potrzebne do zaimplementowania:
//1. potrzebujemy sortowania
//2. szukanie wg zawartosci kolumn(kazdej nawet moze);
//3
class KreatorLinkowAPI {
    //narazie nie bedzie to obslugiwalo intergero. Po szukanie trzeba zaimplementowac, bo bedzie narazie robic:
    //select * from firmy where id_firmy like '123%'
    //gdy sie poda 123 w wyszukiwarce id_firmy
    constructor(protokul = "http", host = "localhost", port = "7777", sortujWg = "id_firmy", kierunekSortowania = "ASC", 
                kolumnyPrzeszukiwane = {}) {
        this.protokul = protokul;
            this.host = host;
            this.port = port;
            this.sortujWg = sortujWg;
            this.kierunekSortowania = kierunekSortowania;
            this.kolumnyPrzeszukiwane = kolumnyPrzeszukiwane;
            this.koncowyLink = "";
    }
    // pobierzJednoID=(id)=>{
    //     return `${protokul}://${host}:${port}/${sortujWg}?`
    // } // narazie nie patrzmy na jedno ID, moze po prostu bedziemy to robic bez korzystania z kreatora, bo nie ma az tak wielkiej
    //potrzeby chyba

    dodaj(klucz, wartosc) {
        
        this.kolumnyPrzeszukiwane[klucz] = wartosc;
        return this;
    }

    wypelnijDanymi = () => {
        let url= `${this.protokul}://${this.host}:${this.port}/${this.sortujWg}?`
        const kol=this.kolumnyPrzeszukiwane;
        console.log("poczatek iterowania po tablicy this.kolumnyPrzeszukiwane")
        // console.log(typeof(kol))
        if (Object.keys(kol).length>0){
            console.log("obiekt a nie tablica, ma dlugosc >0")
            for (let a in kol){
                // console.log("console.log(a)")
                // console.log(a) //dir
                // console.log("console.log(kol.a)")
                // console.log(kol[a]); //desc

                url+=`${a}=${kol[a]}&`
            }
        }else {
            console.log("obiekt a nie tablica, ma 0 elementow")
        }
        // console.log("koniec iterowania po obiekcie a nie tablicy kol")
        // console.log("koncowy url= " +url)
        this.koncowyLink = url.slice(0, -1);
        return this.koncowyLink;
    }
    koncowyAPIURL=()=>{
        return this.koncowyLink;
    }

    //czesc testowa:
    wyswietlZawartosc() {
        console.log("\n\n\n\n\nWYSWIETL ZAWARTOSC TESTOWA Z KRETORALINKOW API:: ")

        console.log("this.protokul")
        console.log(this.protokul)
        console.log("this.host")
        console.log(this.host)
        console.log("this.port")
        console.log(this.port)
        console.log("this.sortujWg")
        console.log(this.sortujWg)
        console.log("this.kierunekSortowania")
        console.log(this.kierunekSortowania)
        const k = this.kolumnyPrzeszukiwane;
        for (let i in k){
            console.log(`this.kolumnyPrzeszukiwane.${i}`)
            console.log(k[i]);
        }
    }
}
export default KreatorLinkowAPI;