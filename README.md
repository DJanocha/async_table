Projekt sklada sie z dwoch czesci:

-server (backend)

-client (frontend) (jeszcze nie jest gotowy)

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

 
