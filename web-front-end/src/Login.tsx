/*global FB*/
import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';


interface Props {
  onLoginSuccess: CallableFunction
  onLoginFailure: CallableFunction
}

interface State {
}


export class Login extends React.Component<Props, State> {
  login = () => {
    FB.login((response) => {
      if (response.authResponse) {
        this.props.onLoginSuccess(response)
      } else {
        this.props.onLoginFailure(response)
      }
    }, {scope: 'email,user_friends,user_photos,user_birthday'});
  }
  render () {
    return (
    <div className="login-screen">
      <div className="logo">
        Cheeky
      </div>
      <div className="t-and-a">
        By tapping login, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/terms">Privacy Policy</Link>.
      </div>
      <button
      onClick={this.login}
      className="button facebook">Login with Facebook</button>
        <div className="t-and-a">
          We don't post anything to Facebook.
        </div>
    </div>

    )
  }
}