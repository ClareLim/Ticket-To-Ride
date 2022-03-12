import React, { useEffect, useState } from 'react';
import SeatSelector from '../components/SeatSelector/SeatSelector';
import TravellerListItem from '../components/TravellerListItem/TravellerListItem';
import axios from 'axios';

export default function Add() {
    const [selectedSeats, setSelectedSeats] = useState([])
    const [travellers, setTravellers] = useState([])
    const [occupiedSeats, setOccupiedSeats] = useState([])

    useEffect(() => {
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

    const handleSelectedSeatsChange = (seats) => {
        setSelectedSeats(seats)
    }

    // filtering the previous seats against the selected seat, if not true, then the selected seat and the traveller will be deleted, state of traveller and seat are different
    const handleDelete = (seatNumber) => {
        setSelectedSeats(prevSeats => {
            return prevSeats.filter(prevSeat => prevSeat !== seatNumber)
        })
        setTravellers(prevTravellers => {
            return prevTravellers.filter(
                prevTraveller => {
                    return prevTraveller.seatNumber !== seatNumber
                })
        })
    }

    // any changes made to the input (i.e. any of 6 fields), will update the list of travellers submitted to backend
    const handleCollate = (traveller) => {
        setTravellers(prevTravellers => {
            //if no traveller,add it in to the 
            const foundTraveller = prevTravellers.find(prevTraveller => {
                return prevTraveller.seatNumber === traveller.seatNumber
            })
            if (foundTraveller !== undefined) {
                //update
                const newTravellers = prevTravellers.filter(prevTraveller => {
                    return prevTraveller.seatNumber !== traveller.seatNumber
                })
                return [...newTravellers, traveller]
            } else {
                // insert
                return [...prevTravellers, traveller]
            }
            //if there is traveller, update the array
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3000/travellers/bulkAdd', {
            travellers: travellers
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Status:' + res.status)
                }
                alert("Tickets have been submitted!");
                setOccupiedSeats(prevState => [...prevState, ...selectedSeats])
                setSelectedSeats([])
                setTravellers([])
            })
            .catch(error => {
                console.error(error)
                alert('Error:' + JSON.stringify(error));
            });

    }

    return <div className='ui two column grid'>
        <section className='column' >
            <SeatSelector
                selectedSeats={selectedSeats}
                occupiedSeats={occupiedSeats}
                handleSelectedSeatsChange={handleSelectedSeatsChange}
            />
            <p style={{
                margin: "10px 100px",
                textAlign: "center"
            }}> Note: Only Cash Accepted. Also, Payment must be accepted before Submitting Form </p>
        </section >


        <section className='column'>
            <button
                className="ui olive button"
                type="submit"
                onClick={handleSubmit}>
                ({selectedSeats.length}) Submit For Payment</button>

            {selectedSeats.length === 0 && <p
                style={{
                    marginTop: "10px",
                }}
            >Please select a seat</p>}
            {selectedSeats.map(seatNumber =>
                <TravellerListItem
                    key={seatNumber}
                    seatNumber={seatNumber}
                    handleDelete={handleDelete}
                    collate={handleCollate}
                />)}
        </section>
    </div>

}
