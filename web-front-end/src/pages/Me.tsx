/*global FB*/
import React from 'react';
import './Me.scss';
import { ProfilePicture } from 'ProfilePicture';

interface Props {
}

interface State {
  showxImageModal: boolean;
}


export class Me extends React.Component<Props, State> {

  logout = () => {
    FB.logout(() => {
      window.location.reload();
    })
  }

  render() {
    return (
    <section className="me-page">
      <div className="top">
        <div className="header"></div>
        <div className="images">
          <div className="primary">
            <ProfilePicture
              src="/test2.png"
              linkTo='/me/edit'
              // editText="EDIT PHOTOS"
              showEdit/>
          </div>
          <div className="other">
            <ProfilePicture src="/test2.png" />
            <ProfilePicture src="/test2.png" />
            <ProfilePicture src="/test2.png" />
            <ProfilePicture src="/test2.png" />
            <ProfilePicture src="/test2.png" />
          </div>
        </div>
        <div className="prefrences">
          <button className="button warning small" onClick={this.logout}>Logout</button>
        </div>
      </div>
      <div className="bottom">
        <h1 className="title1 bio-title">Bio</h1>
        <div className="bio">
          <textarea defaultValue="I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio." />
        </div>
      </div>
    </section>
    )
 }
}