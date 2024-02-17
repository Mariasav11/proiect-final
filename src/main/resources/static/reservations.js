$(document).ready(() => {
    let idOfReservationToDelete;

    $('.delete-icon').click(function () {
        idOfReservationToDelete = this.parentElement.id;
        fetch('movies/remove-reservation/' + idOfReservationToDelete, {
            method: 'DELETE',
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

    });
})