import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchEvents } from './actions'
import { EventList } from './EventList'
import EventDetail from './EventDetail'

class ListBar extends Component {
	render(){
		return (<EventList events={this.props.events}><EventDetail hideFields={true} fieldsToShow={{name:true, date:true,time:true, time_preparation: true, contact: true, org: true, mail: true, phone: true, place:true}}></EventDetail></EventList>)
	}


	componentWillMount(){
		this.props.dispatch(fetchEvents(this.props.match.params.code))
	}

}

function mapStateToProps(state){
  return {
    events: state.events.events.sort((a,b)=>new Date(b.date) - new Date(a.date)),
  }
}

export default connect(mapStateToProps)(ListBar)
