
import './App.css';
import api from './api/api'
import {Snackbar, CircularProgress} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import Aircrafts from './components/Aircrafts'
import AllFlights from './components/AllFlights'
import { FlightsList, Header } from './styles/styles'
import SelectedFlights from './components/SelectedFlights'
import React from 'react';
import autoBind from 'react-autobind';
import Timeline from './components/Timeline';
import {times} from './constants/times'
class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        aircrafts: [],
        flights: [],
        error: '',
        loading: true,
        open: false,
        message:'',
        timeline: [{start: 0, end: times.MAX, type: 'null'}],
        percentage: 0,
        percentWithoutTurnaround: 0
    };

    autoBind(this);
  }

  async componentDidMount() {
    let responseFromAircrafts;
    try{
      responseFromAircrafts = await api.getAircrafts();
    } catch(error) {
      return;
    }
    this.setState({aircrafts: responseFromAircrafts &&  responseFromAircrafts.data ? responseFromAircrafts.data : []});

    let tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    this.setState({date:tomorrow.toDateString(), loading: false });
  }

  handleAdd(flight, index) {
      const { flights } = this.state;
      if (flights.length === 0) {
        this.setState({ flights: [ flight ] },
          () => {this.calculate()});
      } else {
        let arr = this.state.flights;
        arr.splice(index, 0, flight);
        this.setState({ flights: arr },
          () => {this.calculate()});
      }
      this.setState({open: true, message: 'Successfully added flight ' + flight.id});
  }

  handleDelete(flight) {
    const toReturn = this.state.flights.filter(element => element.id !== flight.id);
    this.setState({flights: toReturn}, () => {this.calculate()});
    this.setState({open: true, message: 'Successfully removed flight ' + flight.id});
  }

  handleClose(event, reason){ 
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false, message: ''});
  }


  calculate() {
    let arr = [];
    for(let x = 0; x < this.state.flights.length; x++ ){
      arr.push({start: this.state.flights[x].departuretime, end: this.state.flights[x].arrivaltime, type: 'flight'});
      arr.push({start: this.state.flights[x].arrivaltime, end: (this.state.flights[x].arrivaltime +times.TURNAROUND ), type: 'turnaround'});
    }

    if(arr[0] && arr[0].start > 0){
      arr.unshift({start: 0, end: arr[0].start, type: 'null'});
    }

    for(let x =1; x < arr.length; x ++ ){
        if(arr[x].start > arr[x-1].end){
          arr.splice(x, 0, {start: arr[x-1].end, end: arr[x].start, type: 'null'});
        }
    }
    

    if(arr.length > 2 && arr[arr.length-2].end <= times.MAX) {
      if(arr[arr.length-2].end === times.MAX){
        arr.pop();
        arr.pop();

      }else {
      arr.pop();
      arr.push({start: arr[arr.length-1].end, end: times.MAX, type: 'null'});
      }
    }
    if (arr.length === 0 ){
      arr = [{start: 0, end: times.MAX, type: 'null'}];
    }
    this.setState({timeline: arr});


    const percentWithoutTurnaround = arr.filter((element) => {return element.type !== 'null' && element.type !== 'turnaround'});
    let percentage = 0;
    for(let element of percentWithoutTurnaround) {
      percentage = percentage + parseFloat(((element.end-element.start)/times.MAX*100).toFixed(1));
    }
    percentage = percentage.toFixed(1);
    this.setState({percentWithoutTurnaround: percentage});
    const percent = arr.filter((element) => {return element.type !== 'null'});
    percentage = 0;
    for(let element of percent) {
      percentage = percentage + parseFloat(((element.end-element.start)/times.MAX*100).toFixed(1));
    }
    percentage =percentage.toFixed(1);
    this.setState({percent: percentage});
}

  render() { 
    return (
    <div>
     {this.state.loading && <CircularProgress />}
  {<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={this.state.open} autoHideDuration={4000} onClose={this.handleClose}>
  <Alert onClose={this.handleClose} severity="success">
    {this.state.message}
  </Alert>
</Snackbar>}
    
    {this.state.error && <Alert color="danger">
    {this.state.error}
    </Alert>}
    <FlightsList>
      <Header>
    {this.state.date}
      </Header>
    </FlightsList>
    <Aircrafts aircraft={this.state.aircrafts} />
    <SelectedFlights flights={this.state.flights} aircraft={this.state.aircrafts} handleDelete={this.handleDelete} />
    <AllFlights aircraft={this.state.aircrafts} flights={this.state.flights} handleAdd={this.handleAdd}/>
    <Timeline flights={this.state.timeline} allFlights={this.state.flights} percent={this.state.percent} percentWithoutTurnaround={this.state.percentWithoutTurnaround}/>
</div>

  );
    }
  }

export default App;
