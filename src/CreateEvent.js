
import React, { Component } from 'react';
import EventForm from './EventForm'
import moment from 'moment';
import { connect } from 'react-redux'
import { addEvent, openSnackbar, fetchEvents } from './actions'
import Snackbar from 'material-ui/Snackbar';
import { withRouter } from 'react-router-dom'
import SecondaryToolbar from './SecondaryToolbar'

class CreateEvent extends Component {

  constructor(props) {
    super(props);
    this.state = { ocupiedPlaces:[] };
  }

  render() {
    let date = this.props.match.params.eventDate
    let moment2 = moment(date)
    let formatDate = new Date(this.props.match.params.eventDate)
    moment2.locale('cs')
    return (
      <div className="CreateEvent">
      <SecondaryToolbar style={{position: 'static' }}>
      <h3>Akce na {moment2.format('LL')}</h3>
      </SecondaryToolbar>
      <div className="create-event-content">
      <EventForm disabled={this.state.ocupiedPlaces} submitDisabled={this.props.isFetching && this.props.isFetching.type=="REQUEST_ADD_EVENT"} onSubmit={this.onSubmit} initialValues={{ date: formatDate }}></EventForm>
      </div>
      </div>
    )
  }

  getOccupiedPlaces = () =>{
      return this.props.events.filter((event)=>event.date === this.props.match.params.eventDate).map((event)=>event.place)
  }

  onSubmit = (data)=>{
      this.props.dispatch(addEvent(data)).then(this.successCallback,this.errorCallback)
  }

  componentWillMount() {
    this.props.dispatch(fetchEvents()).then(()=>{this.setState({ocupiedPlaces: this.getOccupiedPlaces()})}).catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
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
    isFetching: state.events.isFetching
  }
}

export default withRouter(connect(mapStateToProps)(CreateEvent));
