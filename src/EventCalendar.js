
import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {CalendarEvent} from './CalendarEvent'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import { connect } from 'react-redux'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { logout, openSnackbar } from './actions'
import SecondaryToolbar from './SecondaryToolbar'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

class EventCalendar extends Component {

  render() {
    let preparedCss = this.prepareEventCss()
    console.log(this.state)
    let components = {toolbar : CalendarToolbar, dateCellWrapper: Test, eventWrapper: Blank}
    if(this.state.width >= 500){
      components = {toolbar : CalendarToolbar}
    }
    return (
    <div className="EventCalendar" style={{height: '100%', overflow: 'auto'}}>
      <style dangerouslySetInnerHTML={{__html: preparedCss}} />
       <BigCalendar 
         selectable
      	 events={this.props.events} 
         startAccessor="date" 
         endAccessor="date" 
         components = {components}
         views={['month']} 
         onSelectSlot={(selected)=>{this.props.history.push('/events/create/'+moment(selected.start).format('YYYY-MM-DD'))}}
    	/>
    </div>
    )
  }

  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0' };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  groupEventsByDate(events){
    let array = []
    events.forEach((event) => {
     array.push(events.filter((evt)=>evt.date == event.date))  
    })
    return array; 
  }

  prepareEventCss = () => {
    console.log(this.groupEventsByDate(this.props.events))
    return this.groupEventsByDate(this.props.events).map(
          (array) =>{ 
            let date = moment(array[0].date, "YYYY-MM-DD").toDate()
            let className = "date-bg" +date.getFullYear()+""+ date.getMonth() + "" + date.getDate() + ""
            return "."+className+this.getBgStyle(array)
          }
    ).join(' ')   
  }

  getBgStyle = (eventArray) => {
    switch(eventArray.length){
    case 1: return "{background: #b2ebf2}"
    case 2: return "{background: #00bcd4}"
    case 3: return "{background: #0097a7}"
    }
  }

}


class Test extends Component {

  render() {
   return (<div className={"date-bg"+this.props.value.getFullYear()+""+this.props.value.getMonth()+""+this.props.value.getDate()+""} style={{color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' ,borderLeft: '1px solid #DDD', width: '100%', height: '100%' , diplay: 'flex'}}></div>) 
  }

  componentDidMount(){

  }

}

class Blank extends Component {
  render() {
   return (<div></div>) 
  }

  componentDidMount(){

  }

}

class CalendarToolbar extends Component {

  render() {
    console.log(this)
    return (
      <SecondaryToolbar>
      <div style={{justifyContent: 'center', display: 'flex', alignItems: 'center', width: '100%' }}>
      <IconButton style={{width: 96,height: 96,padding: 24,}} iconStyle={{width: 48, height: 48,}} onClick={()=>{this.props.onNavigate('PREV')}}><KeyboardArrowLeft/></IconButton>
      <div style={{width: 150, display: 'flex', justifyContent: 'center'}}><h2>{this.props.label}</h2></div>
      <IconButton style={{width: 96,height: 96,padding: 24,}} iconStyle={{width: 48, height: 48,}} onClick={()=>{this.props.onNavigate('NEXT')}}><KeyboardArrowRight/></IconButton>
      </div>
      </SecondaryToolbar>
     )
  }
}


export default withRouter(EventCalendar);

