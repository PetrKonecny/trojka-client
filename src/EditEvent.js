
import React, { Component } from 'react';
import EventForm from './EventForm'
import moment from 'moment';
import { connect } from 'react-redux'
import { editEvent, openSnackbar, fetchEventsAdmin } from './actions'
import Snackbar from 'material-ui/Snackbar';
import { withRouter } from 'react-router-dom'

export class EditEvent extends Component {

  render() {
    if(this.props.event && this.props.event.id){
      let eventWithPlace = Object.assign({},this.props.event,{place: this.getPlace(this.props.event.place)})
      return(<div className="EditEvent"><EventForm className="event-form" onSubmit={this.onSubmit} initialValues={eventWithPlace} /></div>)
    }else{
      return null
    }
  }

  onSubmit = (data)=>{
      this.props.dispatch(editEvent(data)).then(this.successCallback,this.errorCallback)
  }

  componentWillMount() {
      this.props.dispatch && this.props.dispatch(fetchEventsAdmin()).catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
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
      this.props.dispatch && this.props.dispatch(openSnackbar("Akce úspěšně upravena"))
  }
  
  errorCallback = ()=>{
      this.props.dispatch && this.props.dispatch(openSnackbar("Chyba při upravování akce"))
  }
}

function mapStateToProps(state, props){
  return {
    event: props.event ? props.event : (props.match && props.match.params.id ? state.events.events.find((event)=>{return event.id === props.match.params.id}) : undefined),
    isFetching: state.events.isFetching
  }
}

export default withRouter(connect(mapStateToProps)(EditEvent));
