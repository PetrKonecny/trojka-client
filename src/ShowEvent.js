import React, { Component } from 'react';
import { connect } from 'react-redux'
import  EventDetail from './EventDetail'
import { openSnackbar, fetchEventsAdmin } from './actions'

class ShowEvent extends Component {
  
  render(){
    return(
      this.props.event && <EventDetail data={this.props.event}></EventDetail>
    )
  }

  componentWillMount() {
      this.props.dispatch(fetchEventsAdmin()).catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
  }
  
}

function mapStateToProps(state, props){
  return {
    event: state.events.events.find((event)=>{return event.id === props.match.params.id})
  }
}


export default connect(mapStateToProps)(ShowEvent)
