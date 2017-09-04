
import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {CalendarEvent} from './CalendarEvent'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { withRouter } from 'react-router-dom'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

class EventCalendar extends Component {

  render() {
    return (
    <div style={{height: '90%', overflow: 'auto'}}>
       <BigCalendar 
         selectable
      	 events={this.props.events} 
         startAccessor="date" 
         endAccessor="date" 
         views={['month']} 
         onSelectSlot={(selected)=>{this.props.history.push('/events/create/'+selected.start.toDateString())}}
    	/>
    </div>
    )
  }
}

export default withRouter(EventCalendar);

