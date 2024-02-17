package org.example.controller;

import org.example.model.Movie;
import org.example.model.Reservation;
import org.example.service.MovieService;
import org.example.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("movies")
@RestController
public class MovieController {

    private ReservationService reservationService;
    private MovieService movieService;

    @Autowired
    public MovieController(ReservationService reservationService, MovieService movieService) {
        this.reservationService = reservationService;
        this.movieService = movieService;
    }


    @GetMapping("{movieId}/reservations")
    public List<Reservation> getReservationsFromMovieId(@PathVariable Integer movieId) {
        return reservationService.findAllReservationsByMovieId(movieId);
    }

    @GetMapping("/reservations")
    public List<Reservation> getReservations() {
        return reservationService.getAllReservations();
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.addMovie(movie);
    }

    @PutMapping("/{movieId}")
    public Movie updateMovie(@RequestBody Movie movie, @PathVariable Integer movieId) {
        movie.setMovieId(movieId);
        return movieService.addMovie(movie);
    }


    @PostMapping("/add-reservation/{movieId}")
    public Reservation addReservation(@RequestBody Reservation reservation, @PathVariable Integer movieId) {
        Movie movie = movieService.getMovieById(movieId);
        movie.setNoOfTickets(movie.getNoOfTickets() - reservation.getNoOfTickets());
        movieService.addMovie(movie);
        reservation.setMovie(movie);
        return reservationService.addReservation(reservation);
    }

    @DeleteMapping("/remove-reservation/{reservationId}")
    public void deleteReservation(@PathVariable Integer reservationId) {
        Reservation currentReservation = reservationService.getReservationById(reservationId);
        Movie movie = currentReservation.getMovie();
        movie.setNoOfTickets(currentReservation.getNoOfTickets() + currentReservation.getMovie().getNoOfTickets());
        movieService.addMovie(movie);
        reservationService.deleteReservation(reservationId);
    }

}