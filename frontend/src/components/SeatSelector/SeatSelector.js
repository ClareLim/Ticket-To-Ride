
import React from 'react'
import clsx from 'clsx'

import './SeatSelector.css'

const seats = Array.from({ length: 5 * 5 }, (_, i) => i)

export default function SeatSelector(props) {

    const handleSelectedSeatsChange = (selectedSeats) => {
        props.handleSelectedSeatsChange(selectedSeats)
    }


    return (
        <div className="App">
            <ShowCase />
            <Cabin
                selectedSeats={props.selectedSeats}
                occupiedSeats={props.occupiedSeats}
                onSelectedSeatsChange={handleSelectedSeatsChange}
            />

            <p className="info">
                You have selected <span className="count">{props.selectedSeats.length}</span>{' '}
                seats for the price of ${`${props.selectedSeats.length * 100}`}.
                {/* epheremal,using localstate */}
            </p>
        </div>
    )
}

function ShowCase() {
    return (
        <ul className="ui container ShowCase" style={{ marginTop: "10px" }}>
            <li>
                <span className="seat" /> <small>N/A</small>
            </li>
            <li>
                <span className="seat selected" /> <small>Selected</small>
            </li>
            <li>
                <span className="seat occupied" /> <small>Occupied</small>
            </li>
        </ul>
    )
}

function Cabin({ selectedSeats, onSelectedSeatsChange, occupiedSeats }) {

    function handleSelectedState(seat) {
        const isSelected = selectedSeats.includes(seat)
        if (isSelected) {
            onSelectedSeatsChange(
                selectedSeats.filter(selectedSeat => selectedSeat !== seat),
            )
        } else {
            onSelectedSeatsChange([...selectedSeats, seat])
        }
    }

    return (
        <div className="Cinema">
            <div className="seats">
                {seats.map(seat => {
                    const isSelected = selectedSeats.includes(seat)
                    const isOccupied = occupiedSeats.includes(seat)
                    return (
                        <span
                            tabIndex="0"
                            key={seat}
                            className={clsx(
                                'seat',
                                isSelected && 'selected',
                                isOccupied && 'occupied',
                            )}
                            onClick={isOccupied ? null : () => handleSelectedState(seat)}
                            onKeyPress={
                                isOccupied
                                    ? null
                                    : e => {
                                        if (e.key === 'Enter') {
                                            handleSelectedState(seat)
                                        }
                                    }
                            }
                        />
                    )
                })}
            </div>
        </div>
    )
}
