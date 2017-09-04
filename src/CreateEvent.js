
import React, { Component } from 'react';
import EventForm from './EventForm'
import moment from 'moment';
import { connect } from 'react-redux'
import { addEvent, openSnackbar } from './actions'
import Snackbar from 'material-ui/Snackbar';
import { withRouter } from 'react-router-dom'
class CreateEvent extends Component {

   constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
      snackbarMessage: 'TEST MESSAGE'
    };
  }

  render() {
    let date = this.props.match.params.eventDate
    let moment2 = moment(date)
    let formatDate = new Date(this.props.match.params.eventDate)
    moment2.locale('cs')
    return (
      <div className="CreateEvent">
      <div style={{padding: '16px'}}>
      <h3>vytvořit novou akci na {moment2.format('LL')}</h3>
      <EventForm submitDisabled={this.props.isFetching && this.props.isFetching.type=="REQUEST_ADD_EVENT"} onSubmit={this.onSubmit} initialValues={{ date: formatDate }}></EventForm>
      </div>
      </div>
    )
  }

  onSubmit = (data)=>{
      console.log(data)
      let date = moment(data.date).format('YYYY-MM-DD')
      let time = moment(data.time).format('HH:MM')
      let time_preparation = moment(data.time_preparation).format('HH:MM')
      this.props.dispatch(addEvent(Object.assign({}, data, {date: date, time: time, time_preparation: time_preparation, action: 'create'}))).then(this.successCallback,this.errorCallback)
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
    isFetching: state.events.isFetching
  }
}

export default withRouter(connect(mapStateToProps)(CreateEvent));
