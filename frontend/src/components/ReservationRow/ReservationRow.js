import React from 'react';

const ReservationRow = (props) => {

    const handleDelete = () => {
        props.handleDelete(props.id)
    }

    return <tr>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.timeofTicket}</td>
        <td>{props.timeofArrival}</td>
        <td>{props.email}</td>
        <td>{props.phoneNumber}</td>
        <th><button onClick={handleDelete} className="ui yellow button" >Delete Traveller</button>
        </th>
        <th><button className="ui grey button"  >Edit Traveller Details</button>
        </th>
    </tr>
}


export default ReservationRow;

