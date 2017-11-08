
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
import muiThemeable from 'material-ui/styles/muiThemeable';
import {emphasize} from 'material-ui/utils/colorManipulator';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

export class EventCalendar extends Component {

  render() {
    if(this.props.events){
      const primaryColor = this.props.muiTheme && this.props.muiTheme.palette.primary1Color
      const textColor = this.props.muiTheme && this.props.muiTheme.palette.alternateTextColor
      const borderAndTodayColor = this.props.muiTheme && emphasize(this.props.muiTheme.palette.canvasColor,0.3)
      const preparedCss = ".rbc-month-row + .rbc-month-row{ border-top: 1px solid "+borderAndTodayColor
        +"! important;}  .rbc-day-bg{border-left: 1px solid "+borderAndTodayColor+" !important;} .rbc-today{background: "
        +borderAndTodayColor+"!important; }" 
        + this.prepareEventCss(this.props.events, primaryColor)
      let components = {toolbar : CalendarToolbar, dateCellWrapper: Test, eventWrapper: Blank}
      if(this.state.width >= 500){
        components = {toolbar : CalendarToolbar}
      }
      return (
      <div className="event-calendar-wrapper" style={{height: '100%', overflow: 'auto'}}>
        <style dangerouslySetInnerHTML={{__html: preparedCss}} />
         <BigCalendar 
           className="event-calendar"
           selectable
        	 events={this.props.events} 
           startAccessor="date" 
           endAccessor="date" 
           eventPropGetter = {(event, start, end, isSelected)=>{return{style:{backgroundColor: primaryColor, color: textColor}}}}
           titleAccessor= {(event)=>event.title +" - "+ event.place}
           components = {components}
           views={['month']} 
           onSelectSlot={(selected)=>{this.props.history.push('/events/create/'+moment(selected.start).format('YYYY-MM-DD'))}}
      	/>
      </div>
      )
    }else{
      return null
    }
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

  prepareEventCss = (eventArray, color) => {
    return this.groupEventsByDate(eventArray).map(
          (array) =>{ 
            let date = moment(array[0].date, "YYYY-MM-DD").toDate()
            let className = "date-bg" +date.getFullYear()+""+ date.getMonth() + "" + date.getDate() + ""
            return "."+className+this.getBgStyle(array, color)
          }
    ).join(' ')   
  }

  getBgStyle = (eventArray, color) => {
    switch(eventArray.length){
    case 1: return "{background:"+color+"; opacity: 0.5;}"
    case 2: return "{background:"+color+"; opacity: 0.75;}"
    case 3: return "{background:"+color+"; opacity: 1;}"
    }
  }

}


class Test extends Component {

  render() {
   return (<div className={"date-bg"+this.props.value.getFullYear()+""+this.props.value.getMonth()+""+this.props.value.getDate()+""} style={{color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' ,borderLeft: '1px solid #DDD', width: '100%', height: '100%' , diplay: 'flex'}}></div>) 
  }

}

class Blank extends Component {
  
  render() {
   return (<div></div>) 
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


export default withRouter(muiThemeable() (EventCalendar));

