import React from "react";
import './speech-bubble.scss'
import classnames from 'classnames';
import Draggable from 'react-draggable';


interface Props {
  text: string;
  profileImage: string;
  me?: boolean;
}

interface State {
  position: {x: 0, y: 0}
}

export class SpeechBubble extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      position: {x:0, y:0}
    }
  }
  onStop = () => {
    this.setState({position: {x:0, y:0}})
  }

  render() {
    const {profileImage, text, me} = this.props;
    const klass = classnames({
      'speech-bubble': true,
      me
    });


    return (
      <Draggable
        defaultPosition={{x: 0, y: 0}}
        position={this.state.position}
        bounds={'body'}
        onStop={this.onStop}
        axis="x">
        <div className={klass}>
          <img className="profile" src={profileImage} alt="account"/>
          <p>{text}</p>
        </div>
      </Draggable>
    )
  }

}
