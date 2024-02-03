package org.example;

import org.example.model.Movie;
import org.example.model.Reservation;
import org.example.repository.MovieRepository;
import org.example.repository.ReservationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner atStartup(MovieRepository movieRepository, ReservationRepository reservationRepository) {
        return args -> {
            List<Movie> movies = new ArrayList<>();
            movies.add(new Movie(1, "The lord of the rings", "Florin Piersic", 100, 10));
            movies.add(new Movie(2, "Donald Duck", "Florin Piersic", 100, 10));
            movies.add(new Movie(3, "Fast and Furious", "Florin Piersic", 100, 10));
            movieRepository.saveAll(movies);

            List<Reservation> reservations = new ArrayList<>();
            reservations.add(new Reservation(1, 2, "Dana", movies.get(0)));
            reservations.add(new Reservation(2, 10, "Ana", movies.get(0)));
            reservations.add(new Reservation(3, 20, "Ioan", movies.get(2)));
            reservationRepository.saveAll(reservations);
        };
    }

}
