/*global FB*/
import React from 'react';
import './Me.scss';
import { ProfilePicture } from 'ProfilePicture';
import { AppContext } from 'App';
import CheekyClient from 'data-access/cheeky-client';

export interface ProfileImage {
  src: string;
}

interface Props {
  cheekyClient?: CheekyClient
}

interface State {
  images: ProfileImage[];
  imageIndexUnderEdit?: number;
}

export class Me extends React.Component<{}, State> {
  render () {
    return (
      <AppContext.Consumer>
        {appState =>
          <MeDisplay
            cheekyClient={appState.cheekyClient}
          />

        }
      </AppContext.Consumer>
    )
  }
}


class MeDisplay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      images: [],
      imageIndexUnderEdit: undefined,
    }
  }

  logout = () => {
    FB.logout(() => {
      window.location.reload();
    })
  }

  componentDidMount = async () => {
    const {cheekyClient} = this.props;
    if(cheekyClient) {
      const myProfile = await cheekyClient.getMyProfile();
      console.log(myProfile);
    } else {
      console.log('CHEEKY CLIENT NOT READY')
    }
  }

  toggleEdit = (imageIndex: number) => {
    this.setState({ imageIndexUnderEdit: imageIndex })
  }

  render() {
    const { images } = this.state;
    const primaryImage = images[0];
    const otherImages = images.filter((_, index) => (index > 0));

    return (
    <div className="me-page">
      <section className="top">
        <h2 className="section-header">Photos</h2>
        <div className="images">
          <div className="primary">
            {primaryImage && <ProfilePicture src={primaryImage.src} onClick={() => this.toggleEdit(0)}/>}
          </div>
          <div className="other">
            {otherImages.map((img, index) =>
              <ProfilePicture key={img.src + index} src={img.src} onClick={() => this.toggleEdit(index+1)} />
            )}
          </div>
        </div>
      </section>
      <section className="bio">
        <h2 className="section-header">Bio</h2>
        <div className="bio">
          <textarea defaultValue="I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio. I am a bio." />
        </div>
      </section>
      <section className="bottom">
        <h2 className="section-header">Actions</h2>
        <div className="actions">
          <button className="button warning small" onClick={this.logout}>Logout</button>
          {/* <button className="button small" onClick={this.logout}>Away</button> */}
        </div>
      </section>
    </div>
    )
  }
}