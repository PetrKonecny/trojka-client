
import React, { Component, PropTypes } from 'react';
import EventForm from './EventForm'
import moment from 'moment';
import { connect } from 'react-redux'
import { addEvent, openSnackbar, fetchEvents } from './actions'
import Snackbar from 'material-ui/Snackbar';
import { withRouter } from 'react-router-dom'
import SecondaryToolbar from './SecondaryToolbar'
import { getOccupiedPlaces } from './EventUtils'

export class CreateEvent extends Component {

  constructor(props) {
    super(props);
    this.state = { occupiedPlaces:[] };
  }

  render() {
    let date = this.props.date
    let moment2 = moment(date).locale('cs')
    let formatDate = new Date(date)
    return (
      <div className="CreateEvent">
      <SecondaryToolbar style={{position: 'static' }}>
      <h3>Akce na {moment2.format('LL')}</h3>
      </SecondaryToolbar>
      <div className="create-event-content">
      <EventForm className="event-form" disabled={this.state.occupiedPlaces} submitDisabled={this.props.isFetching && this.props.isFetching.type=="REQUEST_ADD_EVENT"} onSubmit={this.onSubmit} initialValues={{ date: formatDate }}></EventForm>
      </div>
      </div>
    )
  }

  onSubmit = (data)=>{
      this.props.dispatch(addEvent(data)).then(this.successCallback,this.errorCallback)
  }

  componentWillMount() {
    let date = this.props.date
    let events = this.props.events
    this.props.dispatch && this.props.dispatch(fetchEvents()).then(()=>{this.setState({occupiedPlaces: getOccupiedPlaces(events,date)})}).catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
  }

  successCallback = ()=>{
      this.props.history.push('/events')
      this.props.dispatch(openSnackbar("Akce úspěšně uložena"))
  }
  
  errorCallback = ()=>{
      this.props.dispatch(openSnackbar("Chyba při ukládání akce"))
  }

}

function mapStateToProps(state, props){
  return {
    events: state.events.events, 
    isFetching: state.events.isFetching,
    date: props.date ? props.date : (props.match && props.match.params.eventDate ? props.match.params.eventDate : undefined) 
  }
}

export default withRouter(connect(mapStateToProps)(CreateEvent));
