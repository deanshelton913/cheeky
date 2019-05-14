/*global FB*/
import React from 'react';
import './Layout.scss';
import { SpeechBubble } from 'speech-bubble';

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
        <div className="account">
          <a href="/me">
            <img className="profile" src="./test2.png" alt="account"/>
          </a>
        </div>
        <div className="logo"></div>
        <div className="chats">
          <a href="/me">
            <img src="./speech-bubble.svg" alt="chats" />
          </a>
        </div>
      </header>
      <main>
        <SpeechBubble text="Testing Bananas" profileImage="./test.png" me />
        <SpeechBubble text="I'm testing." profileImage="./test2.png" />
        <SpeechBubble text="Dude" profileImage="./test.png" me />
        <SpeechBubble text="Testing Bananas" profileImage="./test.png"/>
        <SpeechBubble text="Testing Bananas" profileImage="./test.png"/>
        <SpeechBubble text="Testing Bananas" profileImage="./test.png"/>
        <SpeechBubble text="Dude, Shut up" profileImage="./test.png" me />
      </main>
      <div className="input">
        <input type="text" />
        <button>Send</button>
      </div>
    </div>
}

export default Layout
