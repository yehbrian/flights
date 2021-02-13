import React from 'react';

import { FlightsList, Header, PaginationWrapper } from '../styles/styles'
import { CircularProgress} from '@material-ui/core'
import Flights from './Flights'
import autoBind from 'react-autobind';
import api from '../api/api'
import ReactPaginate from 'react-paginate';
import {add} from '../common/utils';
class AllFlights extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            offset: 0,
            page: 0,
            loading: false
        };
    
        autoBind(this);
      }

      async callFunc() {
        let responseFromFlights;
        try{
            this.setState({loading: true});
          responseFromFlights = await api.getFlights(this.state.offset);
        } catch(error) {
            this.setState({loading: false});
            return;
        }

        this.setState({flights: responseFromFlights.data, page: Math.ceil(responseFromFlights.pagination.total/responseFromFlights.pagination.limit), loading: false});
    
      }

      componentDidMount() {
        this.callFunc();
      }

      handlePageClick = data => {
        let selected = data.selected;
        this.setState({offset: Math.ceil(selected * 25)},  () => {
            this.callFunc();
        });


    };


      render() {
          const {flights} = this.state;
        return (
            <FlightsList>
                <Header>Flights</Header>
                {flights.map((flight, index) => {
                    const disabled = add(this.props.flights, flight) === null && this.props.flights.length > 0
                    return (<Flights key={flight.id} flight={flight} chosen={false} disabled={disabled} handleClick={() => {this.props.handleAdd(flight, add(this.props.flights, flight))}} />)
                })}
            {this.state.loading && <CircularProgress />}

            <PaginationWrapper>

                     <ReactPaginate 
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.page}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        subContainerClassName={'pages pagination'}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
            </PaginationWrapper>


            </FlightsList>
        );
      }
    
}

export default AllFlights