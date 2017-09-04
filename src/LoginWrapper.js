import React, { Component } from 'react';
import {fetchEvents, openSnackbar, closeSnackbar, checkLogin} from './actions'
import { connect } from 'react-redux'
import  EventIndex  from './EventIndex'
import { withRouter } from 'react-router-dom'

class LoginWrapper extends Component {
  render() {
    if(this.props.loggedIn){
      return this.props.children
    }else{
      return null
    }
  }

  componentWillMount() {
    this.loginCheck()
  }

  loginCheck(){
    this.props.dispatch(checkLogin()).then(()=>{
      if(!this.props.loggedIn){
        this.props.history.replace('/login')
      }
    }).catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
  }
}

function mapStateToProps(state, props){
  return {
    loggedIn: state.login.loggedIn,
    admin: state.login.admin
  }
}

export default withRouter(connect(mapStateToProps)(LoginWrapper));

