import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import { Link } from 'react-router-dom'
import { editEvent, openSnackbar, fetchEventsAdmin, deleteEvent, copyEvent  } from './actions'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'

class EventDetail extends Component {
  render(){
    if(this.props.data && this.props.data.id){
    return(
        <div className="EventDetail" style={{boxSizing: 'border-box', padding: '16px', paddingLeft: '32px'}}>
            <h1>{this.props.data.name}</h1>
          <div className="event-detail-field">
            <div className="event-detail-field">
            <b>Datum konání: </b>{this.props.data.date}
            </div>
            <div className="event-detail-field">
            <b>Čas konání: </b>{this.props.data.time}
            </div>
            <div className="event-detail-field">
            <b>Čas začátku chystání: </b> {this.props.data.time_preparation}
            </div>
            <div className="event-detail-field">
            <b>Místo konání: </b> {this.props.data.place}
            </div>
            <div className="event-detail-field">
            <b>Typ akce: </b> {this.props.data.type}
            </div>
            <div className="event-detail-field">
            <b>Odkaz na stránku: </b>{this.props.data.link}
            </div>
            <div className="event-detail-field">
            <b>Předpokládaný počet osob: </b>{this.props.data.count}
            </div>
          </div>
          <div className="event-detail-field">
            <div className="event-detail-field">
            <b>Anotace: </b>{this.props.data.anotation}
            </div>
            <div className="event-detail-field">
            <b>Anotace na plakát: </b>{this.props.data.anotation_poster}
            </div>
          </div>
          <div className="event-detail-field">
            <div className="event-detail-field">
            <b>Zvukař: </b>{this.props.data.sound}
            </div>
            <div className="event-detail-field">
            <b>Poznámky ke zvuku: </b>{this.props.data.sound_more}
            </div>
            <div className="event-detail-field">
            <b>Osvětlení: </b>{this.props.data.lights}
            </div>
            <div className="event-detail-field">
            <b>Poznámky k osvětlení: </b> {this.props.data.lights_more}
            </div>
          </div>
          <div className="event-detail-field">
            <div className="event-detail-field">
            <b>Zodpovědná osoba: </b>{this.props.data.contact}
            </div>
            <div className="event-detail-field">
            <b>Telefon: </b>{this.props.data.phone}
            </div>
            <div className="event-detail-field">
            <b>Kontaktní email: </b>{this.props.data.mail}
            </div>
            <div className="event-detail-field">
            <b>Zastupováno OSA: </b>{this.props.data.osa}
            </div>
          </div>
          <div className="event-detail-field">
            <div className="event-detail-field">
            <b>Hodnocení: </b>{this.props.data.rating}
            </div>
          </div>
          <Divider/>
          <div style={{paddingTop: '12px'}}>
            <RaisedButton secondary={true} onClick={this.onDeleteEventClicked}  label="smazat"/>
            <RaisedButton containerElement={<Link to={'/events/edit/'+this.props.data.id}/>}  secondary={true}  style={{marginLeft:'6px'}} label="editovat"/>
            <RaisedButton secondary={true} onClick={this.onCopyEventClicked} style={{marginLeft:'6px'}} label="kopírovat"/>
          </div>
            <DatePicker DateTimeFormat ={global.Intl.DateTimeFormat} locale="cs-CS" onChange={this.onDateSelected} style={{ display: 'none' }} ref='datepicker' />
        </div>
      )
     }else{
        return null
     }
   }
   onCopyEventClicked = () => {
      this.refs.datepicker.openDialog()
   }

   onDateSelected = (value, formattedValue)=> {
      let event = Object.assign({},this.props.data, {date: formattedValue})
      this.props.dispatch(copyEvent(event)).then(this.successCallbackCopy,this.errorCallbackCopy)
   }

    onDeleteEventClicked = () => {
      this.props.dispatch(deleteEvent(this.props.data)).then(this.successCallbackDelete,this.errorCallbackDelete)
    }

    successCallbackCopy = ()=>{
      this.props.history.push('/events/table')
      this.props.dispatch(openSnackbar("Akce úspěšně zkopírována"))
    }
    
    errorCallbackCopy = ()=>{
        this.props.dispatch(openSnackbar("Chyba při kopírování akce"))
    }

    successCallbackDelete = ()=>{
      this.props.history.push('/events/table')
      this.props.dispatch(openSnackbar("Akce úspěšně smazána"))
    }
    
    errorCallbackDelete = ()=>{
        this.props.dispatch(openSnackbar("Chyba při mazání akce"))
    }
}


export default withRouter(connect()(EventDetail))
