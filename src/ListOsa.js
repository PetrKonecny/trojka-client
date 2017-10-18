import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchEvents } from './actions'
import { EventList } from './EventList'
import EventDetail from './EventDetail'

class ListOsa extends Component {
	render(){
		return (<EventList events={this.props.events}><EventDetail hideFields={true} fieldsToShow={{name:true,date:true,contact:true,osa:true}}></EventDetail></EventList>)
	}


	componentWillMount(){
		this.props.dispatch(fetchEvents(this.props.match.params.code))
	}

}

function mapStateToProps(state){
  return {
    events: state.events.events,
  }
}

export default connect(mapStateToProps)(ListOsa)
