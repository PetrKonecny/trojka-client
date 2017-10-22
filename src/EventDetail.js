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
            <h1>{this.getIsPropShown('name') && this.props.data.name}</h1>
          <div className="event-detail-field">
            {this.getFieldRender('date','Datum konání')}
            {this.getFieldRender('time','Čas konání')}
            {this.getFieldRender('time_preparation','Čas začátku chystání')}
            {this.getFieldRender('place','Místo konání')}
            {this.getFieldRender('type','Typ akce')}
            {this.getFieldRender('link','Odkaz na stránku')}
            {this.getFieldRender('count','Předpokládaný počet osob')}
          </div>
          <div className="event-detail-field">
            {this.getFieldRender('anotation','Anotace')}
            {this.getFieldRender('anotation_poster','Anotace na plakát')}
          </div>
          <div className="event-detail-field">
            {this.getFieldRender('sound','Zvukař')}
            {this.getFieldRender('sound_more','Poznámky ke zvuku')}
            {this.getFieldRender('lights','Osvětlení')}
            {this.getFieldRender('lights_more','Poznámky k osvětlení')}
            {this.getFieldRender('count','Předpokládaný počet osob')}
          </div>
          <div className="event-detail-field">
            {this.getFieldRender('contact','Zodpovědná osoba')}
            {this.getFieldRender('org','Organizace')}
            {this.getFieldRender('phone','Telefon')}
            {this.getFieldRender('mail','Kontaktní email')}
            {this.getFieldRender('osa','Zastupováno OSA')}
          </div>
          <div className="event-detail-field">
            {this.getFieldRender('rating','Hodnocení')}
          </div>
          <Divider/>
          {this.props.showControlls && <div style={{paddingTop: '12px'}}>
            <RaisedButton secondary={true} onClick={this.onDeleteEventClicked}  label="smazat"/>
            <RaisedButton containerElement={<Link to={'/events/edit/'+this.props.data.id}/>}  secondary={true}  style={{marginLeft:'6px'}} label="editovat"/>
            <RaisedButton secondary={true} onClick={this.onCopyEventClicked} style={{marginLeft:'6px'}} label="kopírovat"/>
          </div>}
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

   getIsPropShown = (param)=>{
    return !this.props.hideFields || (this.props.fieldsToShow && this.props.fieldsToShow[param])
   }

   getFieldRender = (prop,title)=>{
      return this.getIsPropShown(prop) && <div>
                <b>{title}: </b> {this.props.data[prop]}
             </div>
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
