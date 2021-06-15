//przyklad linku to : http://localhost:7777/id_firmy?limit=20&nazwa=DA
//serwer to juz umie interpretowac. ze strony frontendu musimy stworzyc klase, ktora te linki bedzie tworzyc
//zaleznie od naszego zapotrzebowania (np sortowanie zmienmy na sortowanie wd miasta lub zmienmy limit, moze nawet port i localhost
//na cos innego
//co bedzie potrzebne do zaimplementowania:
//1. potrzebujemy sortowania
//2. szukanie wg zawartosci kolumn(kazdej nawet moze);
//3
class KreatorLinkowAPI{

    constructor(){
        this.protokul = "http";
        this.host = "localhost";
        this.port = 7777;
        this.sortujWg="id_firmy"
    }
    
}