$(document).ready(() => {
    let idOfMovieToEdit;
    let movieId1;

    $('#add-button-modal').click(() => {
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
        if (idOfMovieToEdit == null) {
            addMovie(newMovie);
        } else {
            editMovie(idOfMovieToEdit, newMovie);
        }
    });

    $('#add-reservation-button-modal').click(function () {
        const name = $('#modal-reservation-person').val();
        const noOfTickets = $('#modal-reservation-number-of-tickets').val();

        let newReservationToBeSaved = {
            personName: name,
            noOfTickets: noOfTickets
        }
        addReservationForAMovie(newReservationToBeSaved)
    });

    $('.edit-icon').click(function () {
        idOfMovieToEdit = this.parentElement.id;
        const row = this.parentElement.parentElement;
        const name = row.children[0].innerText;
        const cinemaName = row.children[1].innerText;
        const noOfTickets = row.children[2].innerText;
        const price = row.children[3].innerText;
        $('#modal-name').val(name);
        $('#modal-cinema-name').val(cinemaName);
        $('#modal-number-of-tickets').val(noOfTickets);
        $('#modal-price').val(price);
    });

    function addMovie(newMovie) {
        fetch('movies', {
            method: 'POST',
            body: JSON.stringify(newMovie),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                location.reload();
            } else {
                alert("There are errors " + response.status);
            }
        });
    }

    function addReservationForAMovie(newReservationToBeSaved) {
        fetch('movies/add-reservation/'+movieId1, {
            method: 'POST',
            body: JSON.stringify(newReservationToBeSaved),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                location.reload();
            } else {
                alert("There are errors " + response.status);
            }
        });
    }

    function editMovie(idOfMovieToEdit, newMovie) {
        fetch('movies/' + idOfMovieToEdit, {
            method: 'PUT',
            body: JSON.stringify(newMovie),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                location.reload();
            } else {
                alert("There are errors " + response.status);
            }
        });
    };

    $('#add-movie-button').click(function () {
        $('#modal-name').val('');
        $('#modal-cinema-name').val('');
        $('#modal-number-of-tickets').val('');
        $('#modal-price').val('');
    });

    $('.add-reservation-button').click(function () {
        movieId1 = this.parentElement.id;
        $('#modal-reservation-person').val('');
        $('#modal-reservation-number-of-tickets').val('');
    })
})