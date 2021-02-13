import {times} from '../constants/times'

export const before = (flight1, flight2) => {
    return flight1 && flight2 && flight1.origin === flight2.destination && (flight1.departuretime - flight2.arrivaltime >= times.TURNAROUND)
}

export const after = (flight1, flight2) => {
    return flight1 && flight2 && flight1.destination === flight2.origin && (flight2.departuretime - flight1.arrivaltime >= times.TURNAROUND) 
}

export const add = (flights, flight) => {
    if(flights && flights.length > 0 ){
        if(before(flights[0],flight)){
            return 0;
        }

        if(after(flights[flights.length-1], flight)){
            return flights.length;
        }

        const index = flights.findIndex(element => before(element, flight));

        if(index >0 && after(flights[index-1], flight))
            return index;

    }

    return null;
}