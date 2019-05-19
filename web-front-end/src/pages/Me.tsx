import React from 'react';
import './Me.scss';
import { ProfilePicture } from 'ProfilePicture';

interface Props {
}

interface State {
}


export class Me extends React.Component<Props, State> {
  onEditClick = () => {
    console.log('EDIT!!!')
  }

  render() {
    return (
    <section className="me-page">
      <div className="header"></div>
      <div className="images">
        <ProfilePicture  src="/test2.png" onEditClick={this.onEditClick} showEdit/>
      </div>
      <div className="prefrences">

      </div>
      <h1 className="bio-title">Bio</h1>
      <div className="bio">
        <textarea defaultValue="I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio." />
        <button>SAVE</button>
      </div>
    </section>
    )
 }
}