
import React, { Component } from 'react';
import EventForm from './EventForm'
import moment from 'moment';
import { connect } from 'react-redux'
import { editEvent, openSnackbar, fetchEventsAdmin } from './actions'
import Snackbar from 'material-ui/Snackbar';
import { withRouter } from 'react-router-dom'

class EditEvent extends Component {

  render() {
    if(this.props.event && this.props.event.id){
      let date = new Date(this.props.event.date)
      let time = moment(this.props.event.time,'HH:mm:ss').toDate()
      let time_preparation = moment(this.props.event.time_preparation,'HH:mm:ss').toDate()
      let eventWithDates = Object.assign({},this.props.event,{date: date, time: time, time_preparation: time_preparation, place: this.getPlace(this.props.event.place)})
      return(<div className="EditEvent"><EventForm  onSubmit={this.onSubmit} initialValues={eventWithDates} /></div>)
    }else{
      return null
    }
  }

  onSubmit = (data)=>{
      this.props.dispatch(editEvent(data)).then(this.successCallback,this.errorCallback)
  }

  componentWillMount() {
      this.props.dispatch(fetchEventsAdmin()).catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
  }

  getPlace(place){
    switch(place){
      case 'Kavárna' : return 'kavarna' 
      case 'Sál' : return 'sal'
      case 'Nádvoří' : return 'nadvori'
      case 'Mínus trojka' : return 'minus_trojka'
      default : return place
    }
  }

  successCallback = ()=>{
      this.props.history.push('/events/table')
      this.props.dispatch(openSnackbar("Akce úspěšně upravena"))
  }
  
  errorCallback = ()=>{
      this.props.dispatch(openSnackbar("Chyba při upravování akce"))
  }
}

function mapStateToProps(state, props){
  return {
    event: state.events.events.find((event)=>{return event.id === props.match.params.id})
  }
}

export default withRouter(connect(mapStateToProps)(EditEvent));
