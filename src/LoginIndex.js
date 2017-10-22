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
import {login, checkLogin, openSnackbar, checkLoginAndLoadCode} from './actions'
import { SubmissionError } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
import './LoginIndex.css';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {emphasize} from 'material-ui/utils/colorManipulator';

 class LoginIndex extends Component{

  constructor(props) {
      super(props);
      this.state = {
          shaking: false,
          zoom: false
      }
  }

  toggleShaking(){
    this.setState({shaking: !this.state.shaking})
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props
    const primaryColor = this.props.muiTheme.palette.primary1Color
    const backgroundColor = emphasize(this.props.muiTheme.palette.canvasColor)
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{fontSize: '400%',marginBottom: '16px'}} className={this.state.zoom? "fade-out" : ""}>TROJKA</h1>
        <i  style={{color: primaryColor, fontSize: '1500%'}} className={this.getClasses()} />
      </div>
      <form style={{padding: '16px', background: backgroundColor, display: 'flex', flexDirection: 'column', alignItems: 'center'}} className={this.state.zoom? "fade-out" : ""} onSubmit={handleSubmit(this.submit)}>
        <div>
          <Field hintText="zadejte heslo" name="password" type="password" component={TextField}/>
        </div>
        <div>
          <RaisedButton type='submit' label="Přihlásit" primary={true} />
        </div>
      </form>
      </div>
    )
  }

  submit = (data)=>{
    return this.props.dispatch(login(data.password))
    .then(this.successCallback)
    .catch((e)=>{
      if(e.name==="ServerError"){
      this.props.dispatch(openSnackbar('Chyba komunikace se serverem'))
      }else if(e.name==="ValidationError"){
        this.toggleShaking()
        setTimeout(()=>{this.toggleShaking()},1000)
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
    this.setState({zoom: true})
    const { cookies,history } = this.props;
    cookies.remove("PHPSESSID")
    cookies.set("PHPSESSID",data.trim())
    setTimeout(()=>{this.props.dispatch(checkLoginAndLoadCode()).then(()=>{history.push('/events')})},500)
  }

  getClasses(){
    let string = "fa fa-coffee "
    string += this.state.shaking? "shake " : " "
    string += this.state.zoom? "zoom " : " "
    return string
  }

}

export default muiThemeable()(withCookies(withRouter(reduxForm({
  form: 'login', 
})(connect()(LoginIndex)))))
