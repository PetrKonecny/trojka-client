import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchEvents } from './actions'
import { EventList } from './EventList'
class ListGraphic extends Component {
	render(){
		return (<EventList events={this.props.events}></EventList>)
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

export default connect(mapStateToProps)(ListGraphic)
