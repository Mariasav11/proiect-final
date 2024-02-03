package org.example.service;

import org.example.model.Movie;
import org.example.model.Reservation;
import org.example.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {
    private ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository){
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> findAllReservationsByMovieId(Integer movieId){
        return reservationRepository.findAllReservationsBelongingToMovie(movieId);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation addReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

//    public Movie findMovieByReservationId(Integer reservationId) {
//    }
}
