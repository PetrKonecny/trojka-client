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
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom'
import moment from 'moment';
import Clear from 'material-ui-icons/Clear'
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField'
import { withRouter } from 'react-router-dom'
import { changeTableFilterDateFrom, changeTableFilterDateTo, changeTableFilterDateBoth, changeTableFilterString } from './actions'
import MainAppBar from './MainAppBar'
import Headroom from 'react-headroom'
import muiThemeable from 'material-ui/styles/muiThemeable';
import {fade} from 'material-ui/utils/colorManipulator';
import SecondaryToolbar from './SecondaryToolbar'

class EventTable extends Component {

   constructor(props) {
        super(props);
        this.state = {
            columnDefs: this.createColumnDefs(),
            width: 0, 
            height: 0,
            sideBarPage: 0
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
        let expectedTableRowCount = this.props.events && this.props.events.filter((event)=>this.doesExternalFilterPass(Object.assign({},{data: event}))).length
        let isTableEmpty =  this.props.events && this.props.events.filter((event)=>this.doesExternalFilterPass(Object.assign({},{data: event}))).length === 0
        let backgroundColor = this.props.muiTheme.palette.canvasColor
        let textColor = this.props.muiTheme.palette.textColor
        let hoverColor = fade(textColor,0.1)
        let tableWrapperStyle = isTableEmpty ? {display: 'none',backgroundColor: backgroundColor, color: textColor} : {display: 'block', height: '100%',backgroundColor: backgroundColor, color: textColor}
        let height = expectedTableRowCount *50 + 60;
          return (
            <div>
            <style dangerouslySetInnerHTML={{__html: ".ag-header-row{border-bottom: 1px solid "+hoverColor+" !important; color: "+fade(textColor,0.7)+" !important;} .ag-row{border: 1px solid "+hoverColor+ " !important;} .ag-row-hover{background-color:"+hoverColor+" !important;}"}} />
            <SecondaryToolbar>{this.renderSecToolbar()}</SecondaryToolbar>
            {isTableEmpty && <h4 style={{textAlign: "center", marginTop: "32px", opacity: "0.5"}}>{this.getNotFoundMessage()}</h4>}
            <div style={{width: '100%',height: height}} className="ag-theme-material">
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
            </div>
        )
  }

  renderSecToolbar = () =>{
    let dateFrom = this.props.filterDateFrom && moment(this.props.filterDateFrom).format("YYYY-MM-DD")
    let dateTo = this.props.filterDateTo && moment(this.props.filterDateTo).format("YYYY-MM-DD")
    let fromElement = <div style={{overflow: 'hidden',display:'flex',alignItems: 'center', width: 'auto' ,maxWidth: '150px'}}><div>Od:</div><TextField className="unstyled" type="date" value={dateFrom} onChange={(event,date)=>this.props.dispatch(changeTableFilterDateFrom(date))}></TextField></div>
    let toElement = <div style={{overflow: 'hidden', display:'flex',alignItems: 'center', width: 'auto', maxWidth: '150px', marginLeft: '1vw'}}><div>Do:</div><TextField className="unstyled" type="date" onChange={(event,date)=>this.props.dispatch(changeTableFilterDateTo(date))}  value={dateTo}></TextField></div>
    let searchElement = <div style={{display:'flex',alignItems: 'center', marginLeft:'auto'}}><TextField onChange={(event,string)=>this.props.dispatch(changeTableFilterString(string))} value={this.props.filterString} hintText="filtrovat"></TextField></div>
    if(this.state.width > 560){
      return <div className= "secondary-toolbar" style={{alignItems: 'center' }}>
              {fromElement}
              {toElement}
              {searchElement}
            </div>
    }else{
            if(this.state.sideBarPage === 0){
              return <div className= "secondary-toolbar table-toolbar-p1" style={{alignItems: 'center' }}>
                {fromElement}
                {toElement}
                <IconButton style={{marginLeft: 'auto', opacity: '0.5'}} onClick={()=>{this.setState({sideBarPage: 1})}} iconClassName="fa fa-chevron-right" />
              </div>
            }else if(this.state.sideBarPage === 1){
              return <div className= "secondary-toolbar table-toolbar-p2" style={{alignItems: 'center' }}>
                <IconButton style={{marginRight: 'auto', opacity: '0.5'}} onClick={()=>{this.setState({sideBarPage: 0})}} iconClassName="fa fa-chevron-left" />
                {searchElement}
              </div>
            }
    }
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

export default muiThemeable()(withRouter(connect(mapStateToProps)(EventTable)))
