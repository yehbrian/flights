import React from 'react';
import autoBind from 'react-autobind'
import {times} from '../constants/times'
import { Slider, Item, StyledDiv } from '../styles/styles'
import _ from 'lodash';
export default class Timeline extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            widths: []
        };
    
        autoBind(this);
      }

    
      render(){
          return(
              <div>
            <Slider>
            <Item key={1} width={25}>03:00</Item>
            <Item key={2} width={25}>09:00</Item>
            <Item key={3} width={25}>15:00</Item>
            <Item key={4} width={25}>21:00</Item>
        </Slider>
            <Slider>
            {this.props.flights.map((element, index) => {
                const percentage = ((element.end-element.start)/times.MAX * 100).toFixed(1);
                return <Item key={index} type={element.type} width={percentage}>{percentage}</Item>
            })}
        </Slider>

        <StyledDiv>Total aircraft usage including turnarounds: {this.props.percent || 0.0}%</StyledDiv>
        <StyledDiv>Total aircraft usage excluding turnarounds: {this.props.percentWithoutTurnaround || 0.0}%</StyledDiv>

        </div>
          );
          }

} 