import React, { Component } from 'react';
import { connect } from 'react-redux'
import  EventDetail from './EventDetail'
import { openSnackbar, fetchEventsAdmin } from './actions'
import Headroom from 'react-headroom'
import MainAppBar from './MainAppBar'

class ShowEvent extends Component {
  
  render(){
    return(
      <div className="content">
        {this.props.event && <EventDetail showControlls={true} data={this.props.event}></EventDetail>}
      </div>
    )
  }

  componentWillMount() {
      this.props.dispatch(fetchEventsAdmin()).catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
  }

  componentDidMount () {
      window.scrollTo(0, 0)
  }
  
}

function mapStateToProps(state, props){
  return {
    event: state.events.events.find((event)=>{return event.id === props.match.params.id})
  }
}


export default connect(mapStateToProps)(ShowEvent)
