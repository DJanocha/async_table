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
Zakładam, że podana baza danych (firmy) jest już zaimportowana do PostgreSQL;

Należy więc wejść do folderu server i pobrać wszystkie zależności, których nie udostępniłem publicznie przy pomocy komenty
>
>npm install
>

Dane wrażliwe (hasła do PostgreSQL) są w pliku .env w katalogu server (nie wysłałem go oczywiście). Należy taki plik utworzyć np w Visual Studio Code.
Podaję przykładowy jego wygląd:

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

Należy pamiętać, by nie korzystać z użytkownika PostgreSQL, gdyż jest to superuser i ma prawa do wszystkiego. Zaleca się jak najszybciej utworzenie innego konta i nadanie mu jak najmniejszych, ale wystarczających do pracy uprawnień. 


Mając już plik ".env" wyedytowany i pobrane wszystkie zależności, można uruchomić serwer przy użyciu metody 
>
>nodemon index.js
>
 będąc w katalogu "server".

 Narazie obsługuje on proste zapytanie SQL'owe.

 ===============================================
 Ucząc się backupu, napisałem prosty pomocnik, który konwertuje adres url podany przez użytkownika w  pasku adresu na zapytanie SQL poprzed wyekstrahowanie req.query i req.params i operowanie na nich (szczegóły w serwer/uzyteczne/KreatorZapytan.js)


[demo](https://user-images.githubusercontent.com/50969285/124115660-5e670680-da6e-11eb-9caf-e6ec45dae877.mp4)

Jak widzimy, pomocnik działa.

Z powodu wrażliwości danych, nie mogę pokazać odpowiedzi serwera, ale odsyła on plik JSON w odpowiedzi na zapytanie wykreowane przez KreatorZapytan.js

Następnie postanowiłęm stworzyć tabelę w React łączącą się z bazą danych i wyświetlającą dane w zależności od odpowiedzi serwera (JSON).

Zacząłem z Redux i Saga by trzymać odpowiedź z serwera w źródle prawdy (globalnym stanie)

Z powodu wielkości bazy danych (miliony rekordów) zdecydowałem, że każda próba sortowania/szukania powinna tworzyć nowe zapytanie SQL do serwera prosząc od odpowiedź w postaci JSON. Nie mógłbym sobie pozwolić bowiem nna trzymanie milionów rekordów w globalym stanie z powodu na obciążenie, któe by one wygenerowały. Później w celu optymalizacji pomyślę o strumieniowaniu, by użytkownik końcowy nie musiał czekać zbyt długo na wyniki szukania/sortowania (wyświetlające sie stopniowo w tabeli)

Jak widzimy, uzykujemy odpowiedź od serwera w postaci danych:

[demo](https://user-images.githubusercontent.com/50969285/124118973-3a0d2900-da72-11eb-94dd-d6e8451b0fca.mp4)

Aczkolwiek wciąż jest wiele do implementacji (choćby w/w sortowanie z nowymi zapytaniami tworzonymi moment)

Chcesz pobawić się kodem, wykorzystać go w jakiś sposób bądź mi jakoś pomóc? Zachęcam jak najmocniej ;)
