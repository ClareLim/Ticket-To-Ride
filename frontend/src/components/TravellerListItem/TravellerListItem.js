import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TravellerListItem(props) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [timeofTicket, setTimeofTicket] = useState(null)
    const [timeofArrival, setTimeofArrival] = useState(null)
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    // const seatNumber = props.seatNumber;
    // const collate = props.collate;
    const { seatNumber } = props;
    //saving as string

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }

    const handleTimeOfTicketChange = (date) => {
        setTimeofTicket(date)
    }

    const handleTimeOfArrivalChange = (date) => {
        setTimeofArrival(date)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value)
    }

    const handleDelete = (e) => {
        e.preventDefault();
        props.handleDelete(props.seatNumber)
    }

    useEffect(() => {
        props.collate({
            firstName,
            lastName,
            seatNumber,
            phoneNumber,
            timeofArrival,
            timeofTicket,
            email
        })

    }, [firstName, lastName, seatNumber, phoneNumber, timeofArrival, timeofTicket, email])

    return <div className='ui fluid card'>
        <div className='content'>
            <form className="ui form">
                <div className='fields'>
                    <div className="eight wide field">
                        <label>First Name</label>
                        <input type="text" name="first-name" placeholder="First Name"
                            onChange={handleFirstNameChange}
                        />
                    </div>

                    <div className="eight wide field">
                        <label>Last Name</label>
                        <input type="text" name="last-name" placeholder="Last Name" onChange={handleLastNameChange} />
                    </div>
                </div>
                <div className='fields'>
                    <div className="eight wide field">
                        <label>Enter Time of Ticket Purchase: </label>
                        <DatePicker showTimeSelect dateFormat="Pp" selected={timeofTicket} onChange={handleTimeOfTicketChange} />
                    </div>
                    <div className="eight wide field">
                        <label>Enter Estimated Arrival Date: </label>
                        <DatePicker selected={timeofArrival} onChange={handleTimeOfArrivalChange} />
                    </div>
                </div>
                <div className='fields'>
                    <div className="eight wide field">
                        <label>Enter Contact Email: </label>
                        <input type="text" name="ContactEmail" placeholder="james.smith@gmail.com" onChange={handleEmailChange} />
                    </div>
                    <div className="eight wide field">
                        <label>Enter Phone Number: </label>
                        <input type="number" name="PhoneNumber" placeholder="+65-8344688" onChange={handlePhoneNumberChange} />
                    </div>
                </div>


                <button
                    className="ui red button"
                    onClick={handleDelete}
                >Delete Traveller</button>

            </form>
        </div>
    </div>
}
