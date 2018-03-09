import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, withRouter } from 'react-router-dom';
import Message from 'components/Message';
import { verify } from '../../Actions/LoginsAction';

class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { history, dispatch, id } = this.props;
    if (!id) {
      history.push('/');
    }
  }
  handleSubmit() {
    const { history, dispatch, id } = this.props;
    const { value } = this.state;
    if (value) {
      dispatch(verify({ id, value })).then((re) => {
        console.log(re);
        if (re.code == 200) {
          Message.toast({ type: "success", message: re.data.msg });
          history.push('/');
        } else {
          Message.toast({ type: "error", message: re.msg });
        }
        if (re.msg && re.msg === 'Account locked due to too many failed login attempts.Please login again.') {
          history.push('/');
        }
      });
    }
  }
  change = (e) => {
    this.setState({ value: e.target.value })
  }
  render() {
    const { isShowPassword } = this.state;
    return <div className="login">
      <section className="form">
        <ul>
          <li>
            <i className="fa fa-key" aria-hidden="true" />
            <TextField
              hintText="one-time-password"
              hintStyle={{ color: "#a6a6a6" }}
              inputStyle={{ color: "#565656" }}
              style={{ width: "90%" }}
              value={this.state.value}
              onChange={this.change}
            />
            {/* <div className="sendCodeButton">
              <i className="fa fa-refresh"></i>
            </div> */}
          </li>
        </ul>
        <RaisedButton label="Submit"
          fullWidth={true}
          className="submit"
          primary={true}
          onClick={this.handleSubmit} />
      </section>
    </div>
  }
}
export default withRouter(connect((state) => {
  return { id: state.login.id }
})(OTP));
