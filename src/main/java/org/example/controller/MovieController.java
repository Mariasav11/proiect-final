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


    @PostMapping("add-reservation")
    public Reservation addReservation(@RequestBody Reservation reservation) {
        return reservationService.addReservation(reservation);
    }

}

