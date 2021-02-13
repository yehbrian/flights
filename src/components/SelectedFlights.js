import React from 'react';

import { FlightsList, Header } from '../styles/styles'
import Flights from './Flights'

const SelectedFlights = ({ flights, aircraft, handleDelete }) => {
    return (
        <FlightsList>
            <Header>Rotation {aircraft && aircraft[0] && aircraft[0].ident ? aircraft[0].ident  : ''}</Header>
            {flights.map((flight, index) => {
                const disabled = ![0, flights.length-1].includes(index)
                return (<Flights key={flight.id} flight={flight} handleClick={handleDelete} chosen disabled={disabled}  />)
            })}
        </FlightsList>
    );
}


export default SelectedFlights