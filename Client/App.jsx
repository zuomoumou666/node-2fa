import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiThemeable from 'material-ui/styles/muiThemeable';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import store from 'reducers/index';
import 'assets/css/main.less'

import Login from './Components/Login/Login';
import OTP from './Components/Login/OTP';
const muiTheme = getMuiTheme({
  fontFamily: 'calibri, sans-serif'
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <Router>
          <div className="backgroundMain">
            <AppBar
              title="User Login"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            <Route path="/" component={Login} exact />
            <Route path="/otp" component={OTP} />
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  }
}