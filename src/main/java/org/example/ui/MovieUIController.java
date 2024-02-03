package org.example.ui;

import org.example.model.Movie;
import org.example.model.Reservation;
import org.example.service.MovieService;
import org.example.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class MovieUIController {
    private ReservationService reservationService;
    private String movies;
    private MovieService movieService;

    @Autowired
    public MovieUIController(ReservationService reservationService, MovieService movieService) {
        this.reservationService = reservationService;
        this.movieService = movieService;
    }

    @GetMapping("reservations-app/{movieId}")
    String getReservationsByMovieId(Model model, @PathVariable(required = false) Integer movieId) {

        List<Reservation> allReservations = reservationService.findAllReservationsByMovieId(movieId);

        model.addAttribute("reservations", allReservations);
        // model.addAttribute("movieName", allReservations.get(0).getMovie().getName());
        //all cities by country
        return "reservations-app";
    }

//  @GetMapping("movies-app/{reservationId}")
//    String getMovieByReservationId(Model model, @PathVariable(required = false) Integer reservationId) {
//
//        Movie movie = reservationService.findMovieByReservationId(reservationId);
//        List<Reservation> allReservations = reservationService.findAllReservationsByMovieId(movieId);
//
//        model.addAttribute("movies", allReservations);
//        // model.addAttribute("movieName", allReservations.get(0).getMovie().getName());
//        //all cities by country
//        return "movies-app";
//    }

    @GetMapping("reservations-app")
    public String getReservations(Model model) {

        List<Reservation> allReservations = reservationService.getAllReservations();

        model.addAttribute("reservations", allReservations);

        return "reservations-app";
    }

    @GetMapping("movies-app")
    public String getMovies(Model model) {
        List<Movie> allMovies = movieService.getAllMovies();

        model.addAttribute("movies", allMovies);
        return "movies-app";
    }

}
