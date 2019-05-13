/*global FB*/
import React from 'react';
import './Layout.scss';

interface MyProps {

}

interface MyState {
  photos: {source: string, id:string}[]
}


export class Layout extends React.Component<MyProps, MyState> {
  componentDidMount = () => {

  }

  logout = () => {
    FB.logout(() => {
      window.location.reload()
    })
  }

  render = () =>
    <div className="layout">
      <header>
        <div className="settings-gear">
          <img src="./gear.svg" alt="settings" />
        </div>
        <div className="logo"></div>
        <div className="account">
          <a href="/me">
            <img className="profile" src="./test.png" alt="account"/>
          </a>
        </div>
      </header>
      <main>
        <div className="speech-bubble">
          <img className="profile" src="./test.png" alt="account"/>
          <p>Testing, testing</p>
        </div>
        <div className="speech-bubble right">
          <img className="profile" src="./test.png" alt="account"/>
          <p>Testing one two three.</p>
        </div>
        <div className="speech-bubble">
          <img className="profile" src="./test.png" alt="account"/>
          <p>I am a chat bubble</p>
        </div>
        <div className="speech-bubble">
          <img className="profile" src="./test.png" alt="account"/>
          <p>I am a chat bubble</p>
        </div>
        <div className="speech-bubble">
          <img className="profile" src="./test.png" alt="account"/>
          <p>I am a chat bubble</p>
        </div>
        <div className="speech-bubble">
          <img className="profile" src="./test.png" alt="account"/>
          <p>I am a chat bubble</p>
        </div>

      </main>
      <div className="input">
        <input type="text" />
        <button>Send</button>
      </div>
    </div>
}

export default Layout
