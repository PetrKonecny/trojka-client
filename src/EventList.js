
import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import './EventList.css';
import moment from 'moment';
import 'moment/locale/cs';

export class EventList extends Component {

  render() {
    return (
       <div className="EventList" style={{padding: '10px', boxSizing: 'border-box'}}>
          {this.props.events.map(event=>
          	<div style={{padding: '2px'}}>
          	<Card>
          	<CardHeader className="CardHeader"
            actAsExpander={this.props.children !== undefined}
            showExpandableButton={this.props.children !== undefined}
      			title={event.name}
      			subtitle={this.getDate(event)}
    		    />
            <div expandable={true}>{this.props.children && React.cloneElement(this.props.children, { data: event})}</div>
		        </Card>
		        </div>
           )}       
       </div>
      )
    }

    getDate(event){
      var moment2 = moment(event.date +" "+ event.time)
      moment2.locale('cs')
      return moment2.format('LLLL')
    }

}
