import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchEvents, openSnackbar, closeSnackbar, checkLogin, logout, checkLoginAndLoadCode} from './actions'
import { connect } from 'react-redux'
import { EventList } from './EventList'
import {EventCalendar} from './EventCalendar'
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import  EventIndex  from './EventIndex'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import CreateEvent from './CreateEvent'
import Snackbar from 'material-ui/Snackbar';
import { withRouter } from 'react-router-dom'
import LoginIndex from './LoginIndex'
import LoginWrapper from './LoginWrapper'
import LinearProgress from 'material-ui/LinearProgress';
import EventTable from './EventTable'
import EditEvent from './EditEvent' 
import FaCalendar from 'react-icons/lib/fa/calendar'
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ShowEvent from './ShowEvent';
import ListGraphic from './ListGraphic'
import ListBar from './ListBar'
import ListOsa from './ListOsa'
import Headroom from 'react-headroom'
import MainAppBar from './MainAppBar'

const PrivateRoute = ({ auth: auth, component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        auth ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
    )

class App extends Component {

  render(){
    return (
      <div className={"App " + (this.props.admin ? "AppAdmin" : "")}>
      {this.props.isFetching && <div className="Main-progress"><LinearProgress color="#000000" mode="indeterminate" /></div>}
      <Headroom><MainAppBar/></Headroom>
      {this.props.checkedLogin && 
      <Switch>
      <Route exact path='/login' component={LoginIndex}/>
      <Route exact path='/graphic/:code' component={ListGraphic}/>
      <Route exact path='/bar/:code' component={ListBar}/>
      <Route exact path='/osa/:code' component={ListOsa}/>
      <PrivateRoute exact auth={this.props.loggedIn} path='/events' component={EventIndex}/>
      <PrivateRoute exact auth={this.props.loggedIn} path='/events/table' component={EventTable}/>
      <PrivateRoute exact auth={this.props.loggedIn} path='/events/create/:eventDate' component={CreateEvent}/>
      <PrivateRoute exact auth={this.props.loggedIn} path='/events/edit/:id' component={EditEvent}/>
      <PrivateRoute exact auth={this.props.loggedIn} path='/events/:id' component={ShowEvent}/>
      <Route path="*" render={()=><div><h1>INVALID ROUTE</h1></div>} status={404} />
      </Switch>
    }
      <Snackbar
            open={this.props.snackbarOpen}
            message= {this.props.snackbarMessage}
            autoHideDuration={4000}
            onRequestClose={ () => this.props.dispatch(closeSnackbar())}
         />
      </div>
    )
  }

  componentWillMount() {
    this.loginCheck()
  }

  loginCheck = ()=>{
    this.props.dispatch(checkLoginAndLoadCode()).catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
  }


  onLogoutClicked = ()=>{
    this.props.dispatch(logout())
    .catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
  }
}

function mapStateToProps(state, props){
  return {
    admin: state.login.admin,
    code: state.code.code,
    loggedIn: state.login.loggedIn,
    checkedLogin: state.login.checkedAt,
    snackbarOpen: state.snackbar.opened,
    snackbarMessage: state.snackbar.message,
    isFetching: state.login.isFetching || state.events.isFetching
  }
}

export default withRouter(connect(mapStateToProps)(App));

