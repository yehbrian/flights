import React from 'react';
import { FlightsList, StyledDiv, Header } from '../styles/styles'
class AircraftsList extends React.Component {
    render() {
        return (
        <FlightsList>
        <Header>Aircrafts</Header>
        {this.props.aircraft && this.props.aircraft.map((element) => <StyledDiv key={element.ident}>Flight ID: {element.ident} | Seats: {element.economySeats} | Aircraft Type: {element.type}</StyledDiv>)}
        </FlightsList> );
    }
  }

export default AircraftsList