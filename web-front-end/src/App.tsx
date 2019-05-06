/*global FB*/
import React from 'react';
import './App.css';
interface DomWindow extends Window {
  fbAsyncInit: Function;
}
export class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    (window as DomWindow).fbAsyncInit = function() {
      FB.init({
        appId      : '2160906307324498',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.3'
      });

      FB.AppEvents.logPageView();

      FB.getLoginStatus(function(response) {
        console.log(response)
      });
    };
  }

  componentClicked(){}
  responseFacebook(){}

  render () {
    return (
      <div className="app">
        <div className="logo-wrapper">
          <div
            className="fb-like"
            data-share="true"
            data-width="450"
            data-show-faces="true">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
