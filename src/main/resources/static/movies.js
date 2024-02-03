$(document).ready(() => {
    //variabila in care tinem minte id-ul tarii pe care o editam, daca este cazul
    let idOfMovieToEdit;
    let idOfMovieToAddReservation;

    //actiunea de pe butonul de SAVE din interiorul modalului
    //asta e deci dupa ce avem date in modal
    $('#add-button-modal').click(() => {
        //extragem valorile introduse in modal
        const name = $('#modal-name').val();
        const cinemaName = $('#modal-cinema-name').val();
        const noOfTickets = $('#modal-number-of-tickets').val();
        const price = $('#modal-price').val();

        const newMovie = {
            name: name,
            cinemaName: cinemaName,
            noOfTickets: noOfTickets,
            price: price,
        };
        //verificam daca avem id de movie de edit
        //daca nu avem, inseamna ca cream un movie nou
        if (idOfMovieToEdit == null) {
            //apelam metoda pt a face post-ul
            addMovie(newMovie);
        } else {
        //daca avem id de movie, atunci este un update, adica un PUT
            editMovie(idOfMovieToEdit, newMovie);
        }
    });

     $('#add-reservation-button-modal').click(() => {
            //extragem valorile introduse in modal
            const movieId = this.parentElement.id;
            const row = this.parentElement.parentElement;

            const name = $('#modal-reservation-person').val();
            const noOfTickets = $('#modal-reservation-number-of-tickets').val();

            const movieName = row.children[0].innerText;
            const movieCinemaName = row.children[1].innerText;
            const movieNoOfTickets = row.children[2].innerText;
            const moviePrice = row.children[3].innerText;

            const newReservation = {
                personName: name,
                noOfTickets: noOfTickets,
                movie: {
                    movieId: movieId,
                    name: movieName,
                    cinemaName: movieCinemaName,
                    noOfTickets: movieNoOfTickets,
                    price: moviePrice
                }
            };
            //verificam daca avem id de movie de edit
            //daca nu avem, inseamna ca cream un movie nou
            addReservationForAMovie(newReservation)
     });


    //actiunea de pe butoanele de tip edit
    //practic, cum avem mai multe butoane de edit, facem generic pe clasa butonului, pe tipul de buton
    //daca click pe delete, citeste din parintele lui id-ul, si seteaza acea variabila, idOfMovieToEdit
    $('.edit-icon').click(function () {
        idOfMovieToEdit = this.parentElement.id;
        const row = this.parentElement.parentElement;
        //citim de pe row (tr) informatiile
        const name = row.children[0].innerText;
        const cinemaName = row.children[1].innerText;
        const noOfTickets = row.children[2].innerText;
        const price = row.children[3].innerText;
        //setez valorile ce vin de pe acel rand in modal
        $('#modal-name').val(name);
        $('#modal-cinema-name').val(cinemaName);
        $('#modal-number-of-tickets').val(noOfTickets);
        $('#modal-price').val(price);
    });

    function addMovie(newMovie) {
        //definim API call-ul. Nu trebuie sa adaugam localhost:8080, se prinde
        fetch('movies', {
            method: 'POST',
            body: JSON.stringify(newMovie),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            //verificam daca e 200 OK statusul
            if (response.ok) {
                //a fost salvat cu succes, si aici dam reload la pagina, ca tabelul sa aiba entitatea noua.
                location.reload();
            } else {
                //trimitem alerta cu mesajul in caz de failure.
                alert("There are errors " + response.status);
            }
        });
    }

    function addReservationForAMovie(newReservation) {
        alert(newReservation)
     //definim API call-ul. Nu trebuie sa adaugam localhost:8080, se prinde

            fetch('movies/add-reservation', {
                method: 'POST',
                body: JSON.stringify(newReservation),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                //verificam daca e 200 OK statusul
//                if (response.ok) {
//                    //a fost salvat cu succes, si aici dam reload la pagina, ca tabelul sa aiba entitatea noua.
//                    location.reload();
//                } else {
                    //trimitem alerta cu mesajul in caz de failure.
                    alert("There are errors " + response.status);
//                }
            });
    }

//    function editMovie(idOfMovieToEdit, newMovie) {
//    //efectuam call-ul de tip PUT, foarte similar cu POST
//    //atat ca la URL adaugam si id-ul, si metoda de PUT
//        fetch('countries/' + idOfCountryToEdit, {
//            method: 'PUT',
//            body: JSON.stringify(newCountry),
//            headers: {
//                'Content-Type': 'application/json'
//            }
//        }).then(response => {
//              //verificam daca e 200 OK statusul
//              if (response.ok) {
//                  //a fost salvat cu succes, si aici dam reload la pagina, ca tabelul sa aiba entitatea noua.
//                  location.reload();
//              } else {
//                  //trimitem alerta cu mesajul in caz de failure.
//                  alert("There are errors " + response.status);
//              }
//          });
//    };

    //acesta este butonul de add country, care deschide modalul cand intentionam sa adaugam o tara noua
    $('#add-movie-button').click(function () {
        //golim modalul in cazul in care au ramas informatii vechi
        //deoarece in cazul de nou, vrem sa incepem cu un modal gol
        $('#modal-name').val('');
        $('#modal-cinema-name').val('');
        $('#modal-number-of-tickets').val('');
        $('#modal-price').val('');
    })

    $('#add-reservation-button').click(function () {
            //golim modalul in cazul in care au ramas informatii vechi
            //deoarece in cazul de nou, vrem sa incepem cu un modal gol
            $('#modal-reservation-name').val('');
            $('#modal-reservation-number-of-tickets').val('');
        })
})