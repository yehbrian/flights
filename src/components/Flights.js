import React from 'react';
import { StyledDiv, ItemHeader, ItemBody } from '../styles/styles'
import {Button} from '@material-ui/core'
const Flight = ({ flight, chosen, disabled, handleClick }) => {
    return <StyledDiv >
        <ItemHeader>
            <p>{flight.id}</p>
            <Button variant="contained" color="primary" disabled={disabled} onClick={() => !disabled ? handleClick(flight) : () => {return;}}>{chosen ? <p>-</p> : <p>+</p>}</Button>
        </ItemHeader>
        <ItemBody>
            <div>
                <p>{flight.origin}</p>
                <p>{flight.readable_departure}</p>
            </div>
            <div>
                <p> -> </p>
            </div>
            <div>
                <p>{flight.destination}</p>
                <p>{flight.readable_arrival}</p>
            </div>
        </ItemBody>
    </StyledDiv>
}

export default Flight