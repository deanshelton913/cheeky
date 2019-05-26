import React from 'react';
import './Navigation.scss';
import { ProfilePicture } from 'ProfilePicture';
import { Link } from 'react-router-dom';


interface Props {
}

interface State {
}


export class Navigation extends React.Component<Props, State> {

  render() {
    return (
      <nav className="navigation">
        <div className="account">
          <Link to="/me">
            <ProfilePicture src="/test2.png" alt="account" onClick={() => console.log('HI!')} />
          </Link>
        </div>
        <div className="logo">
          <Link to="/">
          </Link>
        </div>
        <div className="chats">
          <div className="notification">2000</div>
          <Link to="/dms">
            <img src="/speech-bubble.svg" alt="chats" />
          </Link>
        </div>
      </nav>
    )
 }
}



