<div align="center" color="green"><h1>REACT ASYNC TABLE </h1></div>
<div align="center" ><h3>React table that connects to large database (few million records)</h3></div>
<div color="blue"><h3>Project consists of two parts:</h3></div>


1. server (backend)

2. client (frontend)

<div align="center" color="green"><h3>ENG(PL BELOW):</h3></div>
I assume that given database (firmy) is already imported to PostgreSQL;

Go to the serwer folder and download all the prerequisites using command:

>npm install

Sensitive data (passwords to PostgreSQL) are in .env file in the server catalogue (I haven't uploaded them of course). Please create your own one for example in Visual Studio Code. Please have example attached:

>
>USER= mojuzytkownikpostgres
>
>PASSWORD= mojehaslopostgres 
>
>HOST= localhost
>
>PORT= 5432 
>
>DATABASE= firmy 
>
>APIPORT=3001
>
>

It's considered a bad habit to use postgres user due to his high priviledges, so it's better to create own user as fast as possible and use it instead.

Having already created .env file and downloaded all the prerequisites, one is able to run the server using given command in the serwer folder:

>
>nodemon index.js 
>
Right now it uses only simple SQL queries.

While getting to know the backup,  I wrote small helper, that converts the url address typed in addressbar by the user and takes out req.query and req.params out of it and based on those, creates query for postgres available in serwer/uzyteczne/KreatorZapytan.js


[demo](https://user-images.githubusercontent.com/50969285/124115660-5e670680-da6e-11eb-9caf-e6ec45dae877.mp4)


As we can see, helper works. 
Due to sensitiviti of data, I cannot show the server response, but it gives back the json based on query that queryHelper (KreatorZapytan.js) provides.


Next thing to do was to create react table that connects to backend and displays table according to the data (JSON) server gives in response.

You can try frontend part by entering the klient folder and entering given command:
>
>npm start



I started with Redux + Saga to keep the response of the server withing a source of truth (global state).

I decided to make new request to the server every time user wants to sort things or search for them, because database on which I was working is few million records large and I didn't want to hold all of that data in a state.

As we can see there's the data from the server:

[demo](https://user-images.githubusercontent.com/50969285/124118973-3a0d2900-da72-11eb-94dd-d6e8451b0fca.mp4)


But there's still lot of to implement.

Wanna try that code,use it somehow or give some help? Feel free :)









<div align="center" color="green"><h3>PL:</h3></div>
Zak??adam, ??e podana baza danych (firmy) jest ju?? zaimportowana do PostgreSQL;

Nale??y wi??c wej???? do folderu server i pobra?? wszystkie zale??no??ci, kt??rych nie udost??pni??em publicznie przy pomocy komenty
>
>npm install
>

Dane wra??liwe (has??a do PostgreSQL) s?? w pliku .env w katalogu server (nie wys??a??em go oczywi??cie). Nale??y taki plik utworzy?? np w Visual Studio Code.
Podaj?? przyk??adowy jego wygl??d:

>
>USER= mojuzytkownikpostgres
>
>PASSWORD= mojehaslopostgres 
>
>HOST= localhost
>
>PORT= 5432 
>
>DATABASE= firmy 
>
>APIPORT=3001

Nale??y pami??ta??, by nie korzysta?? z u??ytkownika PostgreSQL, gdy?? jest to superuser i ma prawa do wszystkiego. Zaleca si?? jak najszybciej utworzenie innego konta i nadanie mu jak najmniejszych, ale wystarczaj??cych do pracy uprawnie??. 


Maj??c ju?? plik ".env" wyedytowany i pobrane wszystkie zale??no??ci, mo??na uruchomi?? serwer przy u??yciu metody 
>
>nodemon index.js
>
 b??d??c w katalogu "server".

 Narazie obs??uguje on proste zapytanie SQL'owe.

 ===============================================
 Ucz??c si?? backupu, napisa??em prosty pomocnik, kt??ry konwertuje adres url podany przez u??ytkownika w  pasku adresu na zapytanie SQL poprzed wyekstrahowanie req.query i req.params i operowanie na nich (szczeg????y w serwer/uzyteczne/KreatorZapytan.js)


[demo](https://user-images.githubusercontent.com/50969285/124115660-5e670680-da6e-11eb-9caf-e6ec45dae877.mp4)

Jak widzimy, pomocnik dzia??a.

Z powodu wra??liwo??ci danych, nie mog?? pokaza?? odpowiedzi serwera, ale odsy??a on plik JSON w odpowiedzi na zapytanie wykreowane przez KreatorZapytan.js

Nast??pnie postanowi????m stworzy?? tabel?? w React ????cz??c?? si?? z baz?? danych i wy??wietlaj??c?? dane w zale??no??ci od odpowiedzi serwera (JSON).

Zacz????em z Redux i Saga by trzyma?? odpowied?? z serwera w ??r??dle prawdy (globalnym stanie)

Z powodu wielko??ci bazy danych (miliony rekord??w) zdecydowa??em, ??e ka??da pr??ba sortowania/szukania powinna tworzy?? nowe zapytanie SQL do serwera prosz??c od odpowied?? w postaci JSON. Nie m??g??bym sobie pozwoli?? bowiem nna trzymanie milion??w rekord??w w globalym stanie z powodu na obci????enie, kt??e by one wygenerowa??y. P????niej w celu optymalizacji pomy??l?? o strumieniowaniu, by u??ytkownik ko??cowy nie musia?? czeka?? zbyt d??ugo na wyniki szukania/sortowania (wy??wietlaj??ce sie stopniowo w tabeli)

Jak widzimy, uzykujemy odpowied?? od serwera w postaci danych:

[demo](https://user-images.githubusercontent.com/50969285/124118973-3a0d2900-da72-11eb-94dd-d6e8451b0fca.mp4)

Aczkolwiek wci???? jest wiele do implementacji (cho??by w/w sortowanie z nowymi zapytaniami tworzonymi moment)

Chcesz pobawi?? si?? kodem, wykorzysta?? go w jaki?? spos??b b??d?? mi jako?? pom??c? Zach??cam jak najmocniej ;)
