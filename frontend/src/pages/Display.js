import React, { useEffect, useState } from 'react';
import SeatSelector from '../components/SeatSelector/SeatSelector';
import axios from 'axios';
import ReservationRow from '../components/ReservationRow/ReservationRow';



const Display = () => {
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const callGetReservations = getReservations;
        callGetReservations();
        const callGetOccupiedSeats = getOccupiedSeats;
        callGetOccupiedSeats();
    }, [])

    const getOccupiedSeats = () => {
        axios.get('http://localhost:3000/travellers/occupiedSeats')
            .then(res => {
                setOccupiedSeats(res.data.occupiedSeats)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const getReservations = () => {
        axios.get('http://localhost:3000/travellers/reservations')
            .then(res => {
                setReservations(res.data.reservations)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const deleteReservation = (id) => {
        let result = window.confirm('Delete traveller?')

        if (result === false) {
            return;
        }

        axios.delete('http://localhost:3000/travellers/reservation/' + id)
            .then(res => {
                // setReservations(prevState => {
                //     return prevState.filter(
                //         prevTraveller => {
                //             return prevTraveller._id !== id
                //         })
                // })
                getOccupiedSeats();
                getReservations();
            })
    }



    return (
        <div className='container'>
            <section className='column'>
                <SeatSelector
                    selectedSeats={[]}
                    occupiedSeats={occupiedSeats}
                    handleSelectedSeatsChange={() => { }}
                />
            </section>

            <section>
                <table className="ui single line table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Enter Time of Ticket Purchase</th>
                            <th>Enter Estimated Arrival Date:</th>
                            <th>Enter Contact Email:</th>
                            <th>Enter Phone Number:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* seat number is the element that is returned back when you iterate through an array i.e. occupied seats or selected seats */}
                        {
                            reservations.map(reservation => {
                                console.log(reservation)
                                return <ReservationRow
                                    key={reservation.seatNumber}
                                    id={reservation._id}
                                    firstName={reservation.firstName}
                                    lastName={reservation.lastName}
                                    timeofTicket={reservation.timeofTicket}
                                    timeofArrival={reservation.timeofArrival}
                                    email={reservation.email}
                                    phoneNumber={reservation.phoneNumber}
                                    handleDelete={deleteReservation}
                                />
                            })
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default Display;

