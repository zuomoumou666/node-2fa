import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, withRouter } from 'react-router-dom';
import { reg } from '../../Consts';
import Message from 'components/Message';
import {
  login as loginRequest, verify as verifyRequest,
} from '../../Apis/logins';
import { login } from '../../Actions/LoginsAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPassword: false,
      form: {
        username: '',
        password: ''
      }
    };
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateUserName = () => {
    const { username } = this.state.form;
    return reg.email.test(username);
  }

  validatePassword = () => {
    const { password } = this.state.form;
    return password !== null && password !== undefined && password !== "";
  }

  handleSubmit = () => {
    const { history, dispatch, } = this.props;
    const { form } = this.state;

    if (this.validateUserName() && this.validatePassword()) {
      console.log(form);
      dispatch(login(form))
        .then(res => {
          if (res.code == 200) {
            Message.toast({ type: "success", message: "Email sent successfully." });
            history.push('/otp');

          } else {
            Message.toast({ type: "error", message: res.msg });
          }
        });
    } else {
      Message.toast({ type: "error", message: "Invalid username or password." });
    }
  }

  toggleShowPassword() {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  }

  change = (type, e) => {
    const { form } = this.state;
    form[type] = e.target.value;
    this.setState({ form })
  }
  render() {
    const { isShowPassword, form } = this.state;

    return <div className="login">
      <section className="form">
        <ul>
          <li>
            <i className="fa fa-user" aria-hidden="true" />
            <TextField
              hintText="user"
              hintStyle={{ color: "#a6a6a6" }}
              inputStyle={{ color: "#565656" }}
              style={{ width: "75%" }}
              value={form.username}
              onChange={this.change.bind(this, 'username')}
            />
          </li>
          <li>
            <i className="fa fa-lock" aria-hidden="true" />
            <TextField
              hintText="password"
              hintStyle={{ color: "#a6a6a6" }}
              inputStyle={{ color: "#565656" }}
              style={{ width: "75%" }}
              type={isShowPassword ? "text" : "password"}
              value={form.password}
              onChange={this.change.bind(this, 'password')}
            />
            <i className={"eye fa" + (isShowPassword ? " fa-eye" : " fa-eye-slash")}
              onClick={this.toggleShowPassword}
              aria-hidden="true" />
          </li>
        </ul>
        <RaisedButton label="Login"
          fullWidth={true}
          className="submit"
          primary={true}
          onClick={this.handleSubmit} />
      </section>
    </div>
  }
}
export default withRouter(connect()(Login));
