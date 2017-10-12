import React, { Component } from 'react';
import ReactTable from 'react-table'
import {AgGridReact} from "ag-grid-react";
import 'react-table/react-table.css'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-material.css";
import { connect } from 'react-redux'
import {fetchEventsAdmin, openSnackbar} from './actions'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom'
import moment from 'moment';
import Clear from 'material-ui-icons/Clear'
import IconButton from 'material-ui/IconButton';
import { withRouter } from 'react-router-dom'
import { changeTableFilterDateFrom, changeTableFilterDateTo, changeTableFilterDateBoth, changeTableFilterString } from './actions'

class EventDetail extends Component {
  render(){
    return(
        <div className="EventDetail" style={{padding: '16px', paddingLeft: '32px'}}>
            <h1>{this.props.data.name}</h1>
          <div className="event-detail-field">
            <div className="event-detail-field">
            <b>Datum konání: </b>{this.props.data.id}
            </div>
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
            <RaisedButton secondary={true}  label="smazat"/>
            <RaisedButton containerElement={<Link to={'/events/edit/'+this.props.data.id}/>}  secondary={true}  style={{marginLeft:'6px'}} label="editovat"/>
            <RaisedButton secondary={true}  style={{marginLeft:'6px'}} label="kopírovat"/>
          </div>
        </div>
      )
  }
}

class EventTable extends Component {

   constructor(props) {
        super(props);
        this.state = {
            columnDefs: this.createColumnDefs(),
        }
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    }

    createColumnDefs() {
        return [
            {headerName: "Datum", field: "date" },
            {headerName: "Název", field: "name"},
            {headerName: "Místo", field: "place"}
        ];
    }

    onQuickFilterText = (event) => {
        this.setState({quickFilterText: event.target.value});
    }

     onRowSelected(event) {
    }

  render() {
        if(this.gridApi) { this.gridApi.onFilterChanged() }
        let isTableEmpty =  this.props.events && this.props.events.filter((event)=>this.doesExternalFilterPass(Object.assign({},{data: event}))).length === 0
        let tableWrapperStyle = isTableEmpty ? {display: 'none'} : {display: 'block', height: '100%'}
          return (
            <div style={{width: '100%',height: '100%'}} className="ag-theme-material">
            <div className= "secondary-toolbar" style={{alignItems: 'center' }}>
              <h3>Od:</h3> <DatePicker onChange={(event,date)=>this.props.dispatch(changeTableFilterDateFrom(date))} value={this.props.filterDateFrom} style={{paddingLeft: '16px', width:'100',overflow: 'hidden'}}></DatePicker>
              <h3>Do:</h3> <DatePicker onChange={(event,date)=>this.props.dispatch(changeTableFilterDateTo(date))}  value={this.props.filterDateTo} style={{paddingLeft: '16px', width:'100',overflow: 'hidden'}}></DatePicker>
              {(this.props.filterDateFrom || this.props.filterDateTo) && <IconButton onClick={()=>this.props.dispatch(changeTableFilterDateBoth(null, null))}><Clear/></IconButton>}
              <TextField onChange={(event,string)=>this.props.dispatch(changeTableFilterString(string))} value={this.props.filterString} hintText="filtrovat" style={{paddingRight: '16px', marginLeft: 'auto'}}></TextField>
            </div>
                {isTableEmpty && <h2 style={{textAlign: "center", marginTop: "100px", opacity: "0.5"}}>{this.getNotFoundMessage()}</h2>}
                <div style={tableWrapperStyle}>
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.props.events}
                    enableSorting
                    // events
                    onRowClicked = {(row)=>{this.props.history.push('/events/'+row.data.id)}}
                    onGridReady={this.onGridReady}
                    isExternalFilterPresent = {this.isExternalFilterPresent}
                    doesExternalFilterPass = {this.doesExternalFilterPass}
                >
                </AgGridReact>
                </div>
            </div>
        )
    }

   tableFilterChanged = (dispatchFunction) => {
      this.props.dispatch(dispatchFunction)//.then(()=>{this.gridApi.onFilterChanged();this.forceUpdate()})
   }

   isExternalFilterPresent = ()=>{
      return this.props.filterDateFrom || this.props.filterDateTo || this.props.filterString.length
   }

   nodePassesDate = (node)=>{
      return (((!this.props.filterDateFrom && !this.props.filterDateTo) || moment(node.data.date).isBetween(this.props.filterDateFrom,this.props.filterDateTo)) ||
              ((this.props.filterDateFrom && !this.props.filterDateTo) && moment(node.data.date).isAfter(this.props.filterDateFrom)) ||
              ((this.props.filterDateTo && !this.props.filterDateFrom) && moment(node.data.date).isBefore(this.props.filterDateTo)) 
      )
   }

   getNotFoundMessage = () =>{
      let string = "Žádné záznamy "
      let fromDateString = moment(this.props.filterDateFrom).locale('cs').format('LL') 
      let toDateString =  moment(this.props.filterDateTo).locale('cs').format('LL')
      let stringDate = ""
      if(this.props.filterDateFrom && this.props.filterDateTo){
        stringDate += "mezi daty " + fromDateString + " a " + toDateString
      }else if(this.props.filterDateFrom && !this.props.filterDateTo){
        stringDate += "od data " + fromDateString
      }else if(this.props.filterDateTo && !this.props.filterDateFrom){
        stringDate += "do data " + toDateString
      }
      let stringText = ""
      if(this.props.filterString){
        if(stringDate.length > 0){
          stringText += " a "
        }
        stringText += 'na dotaz "' + this.props.filterString + '"' 
      }
      return string + stringDate + stringText
   }

   nodePassesText = (node)=>{
      return !this.props.filterString.length || node.data.name.indexOf(this.props.filterString) >= 0
   }

   doesExternalFilterPass = (node) => {
      return this.nodePassesDate(node) && this.nodePassesText(node)
   }

    componentWillMount() {
      this.props.dispatch(fetchEventsAdmin()).catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
    }
}

function mapStateToProps(state){
  return {
    events: state.events.events,
    filterDateFrom: state.table.filterFrom,
    filterDateTo: state.table.filterTo,
    filterString: state.table.filterString
  }
}

export default withRouter(connect(mapStateToProps)(EventTable))
