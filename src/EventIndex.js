import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchEvents, openSnackbar} from './actions'
import { connect } from 'react-redux'
import {EventList} from './EventList'
import EventCalendar from './EventCalendar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Link} from 'react-router-dom'

class EventIndex extends Component {
  render() {
    return (
      <div className="EventIndex">
        {!this.props.isFetching && <EventCalendar events={this.props.events}></EventCalendar>}
      </div>
    );
  }

  componentWillMount() {
    this.props.dispatch(fetchEvents()).catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
  }
}

function mapStateToProps(state){
  return {
    isFetching: state.events.isFetching,
    events: state.events.events
  }
}

export default connect(mapStateToProps)(EventIndex);
