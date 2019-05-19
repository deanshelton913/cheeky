import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';


interface Props {
}

interface State {
}


export class Login extends React.Component<Props, State> {
  render () {
    return (
    <div className="login-screen">
      <div className="logo">
        Cheeky
      </div>
      <div className="t-and-a">
        By tapping login, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/terms">Privacy Policy</Link>.
      </div>
      <div className="fb-login-button"
        data-width=""
        data-size="large"
        data-button-type="continue_with"
        data-auto-logout-link="false"
        data-use-continue-as="true"
        />
        <div className="t-and-a">
          We don't post anything to Facebook.
        </div>
    </div>

    )
  }
}