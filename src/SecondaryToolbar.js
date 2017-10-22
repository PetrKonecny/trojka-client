import React, { Component } from 'react';
import { connect } from 'react-redux'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { logout, openSnackbar } from './actions'
import IconButton from 'material-ui/IconButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {emphasize} from 'material-ui/utils/colorManipulator';

class SecondaryToolbar extends Component {

  render() {
    let backgroundColor = emphasize(this.props.muiTheme.palette.canvasColor,0.05)
    let iconsColor = this.props.muiTheme.palette.textColor
    return (
      <div style={{background: backgroundColor, color: iconsColor}} className="secondary-toolbar">
      {this.props.children}
      {!this.props.admin && <div style={{position: 'absolute', right: '0'}}>
      <IconMenu
            iconButtonElement={<IconButton iconStyle={{color: iconsColor}}><MoreVertIcon viewBox='0 -4 24 24'/></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem onClick={this.onLogoutClicked} primaryText="Odhlásit" />
      </IconMenu>
      </div>}
      </div>
    )
  }

  onLogoutClicked = ()=>{
      this.props.dispatch(logout())
      .catch(()=>this.props.dispatch(openSnackbar('Chyba komunikace se serverem')))
  }
}

function mapStateToProps(state, props){
  return {
    admin: state.login.admin 
  }
}

export default muiThemeable()(connect(mapStateToProps)(SecondaryToolbar))