import React, { Component } from 'react';
import {openSnackbar, logout} from './actions'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {  Link } from 'react-router-dom'
import muiThemeable from 'material-ui/styles/muiThemeable';

class MainAppBar extends Component {


  render(){
      const iconColor = this.props.muiTheme.palette.alternateTextColor
      if(this.props.admin){
      return( 
        <AppBar className="AppBar"
          title="Trojka"
          showMenuIconButton={false}
          iconElementRight={<div>{this.props.loggedIn && <div>
            <IconButton  iconStyle={{color: iconColor}} containerElement={<Link to='/events'/>}   iconClassName="fa fa-calendar-plus-o" />
            <IconButton  iconStyle={{color: iconColor}} containerElement={<Link to='/events/table'/>}   iconClassName="fa fa-file-o" />
            <IconMenu
              iconButtonElement={<IconButton iconStyle={{color: iconColor}} ><MoreVertIcon viewBox='0 -4 24 24'/></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem containerElement={<Link to={'/bar/'+this.props.code}/>} primaryText="Výpis pro bar" />
              <MenuItem containerElement={<Link to={'/graphic/'+this.props.code}/>} primaryText="Výpis pro grafika" />
              <MenuItem containerElement={<Link to={'/osa/'+this.props.code}/>} primaryText="Výpis pro OSA" />
              <MenuItem onClick={this.onLogoutClicked} primaryText="Odhlásit" />
            </IconMenu>
          </div>}
          </div>}
        />
      )}else{
        return null
      }
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
  }
}

export default muiThemeable()(connect(mapStateToProps)(MainAppBar))

