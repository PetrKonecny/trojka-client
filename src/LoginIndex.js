import React, { Component } from 'react';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker,
  TimePicker
} from 'redux-form-material-ui'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import {login, checkLogin, openSnackbar} from './actions'
import { SubmissionError } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

 class LoginIndex extends Component{

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div>
          <Field name="password" type="password" component={TextField}/>
        </div>
        <div>
          <RaisedButton type='submit' label="Odeslat" primary={true} />
        </div>
      </form>
    )
  }

  submit = (data)=>{
    return this.props.dispatch(login(data.password))
    .then(this.successCallback)
    .catch((e)=>{
      console.log(e)
      if(e.name==="ServerError"){
      this.props.dispatch(openSnackbar('Chyba komunikace se serverem'))
      }else if(e.name==="ValidationError"){
        throw new SubmissionError({password: 'špatné heslo'})
      }else{
        throw e;
      }     
    })
  }

  errorCallback = ()=>{
    throw new SubmissionError({password: 'špatné heslo'})
  }

  successCallback = (data)=>{
    const { cookies,history } = this.props;
    cookies.remove("PHPSESSID")
    cookies.set("PHPSESSID",data.trim())
    this.props.dispatch(checkLogin()).then(()=>{history.push('/events')})
  }

}

export default withCookies(withRouter(reduxForm({
  form: 'login', 
})(connect()(LoginIndex))))
