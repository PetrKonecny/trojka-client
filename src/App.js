import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchEvents, openSnackbar, closeSnackbar, checkLogin, logout} from './actions'
import { connect } from 'react-redux'
import { EventList } from './EventList'
import {EventCalendar} from './EventCalendar'
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import  EventIndex  from './EventIndex'
import { Route, Switch, Redirect } from 'react-router-dom'
import CreateEvent from './CreateEvent'
import Snackbar from 'material-ui/Snackbar';
import { withRouter } from 'react-router-dom'
import LoginIndex from './LoginIndex'
import LoginWrapper from './LoginWrapper'
import LinearProgress from 'material-ui/LinearProgress';
import EventTable from './EventTable'

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
  render() {

    return (
      <div className="App" style={{height: '100%', overflow: 'hidden'}}>
      <AppBar
        title="Trojkaset"
        showMenuIconButton={false}        
        iconElementRight={this.props.loggedIn && <FlatButton onClick={this.onLogoutClicked} label="logout"/>}
      >
      </AppBar>
      {this.props.isFetching && <div><LinearProgress color="#000000" mode="indeterminate" /></div>}
      {this.props.checkedLogin && 
      <Switch>
      <Route exact path='/login' component={LoginIndex}/>
      <PrivateRoute exact auth={this.props.loggedIn} path='/events' component={EventIndex}/>
      <PrivateRoute exact auth={this.props.loggedIn} path='/events/table' component={EventTable}/>
      <PrivateRoute exact auth={this.props.loggedIn} path='/events/create/:eventDate' component={CreateEvent}/>
      <Route path="*" render={()=><div><h1>INVALID ROUTE</h1></div>} status={404} />
      </Switch>}
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
    this.props.dispatch(checkLogin()).catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
  }


  onLogoutClicked = ()=>{
    this.props.dispatch(logout())
    .catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
  }
}

function mapStateToProps(state, props){
  return {
    loggedIn: state.login.loggedIn,
    checkedLogin: state.login.checkedAt,
    snackbarOpen: state.snackbar.opened,
    snackbarMessage: state.snackbar.message,
    isFetching: state.login.isFetching || state.events.isFetching
  }
}

export default withRouter(connect(mapStateToProps)(App));

