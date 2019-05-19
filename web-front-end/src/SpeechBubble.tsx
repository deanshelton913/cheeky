import React from "react";
import './SpeechBubble.scss'
import classnames from 'classnames';
import Draggable from 'react-draggable';
import { ProfilePicture } from "ProfilePicture";
import { EmoteMenu } from "EmoteMenu";
const ClickNHold: any = require('react-click-n-hold').default;

interface Props {
  text: string;
  profileImage: string;
  me?: boolean;
}

interface State {
  position: { x: number, y: number },
  showEmoteMenu: boolean,
  isDragging: boolean,
}
const defaultPosition = { x: 0, y: 0 }

export class SpeechBubble extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      position: defaultPosition,
      showEmoteMenu: false,
      isDragging: false,
    }
  }

  start(e: any){
		console.log('START');
	}

	end(e: any, enough: any){
		console.log('END');
    console.log(enough ? 'Click released after enough time': 'Click released too soon');
	}

	clickNHold = (e: any) => {
    console.log('is dragging-->', this.state.isDragging)
    if(!this.state.isDragging) this.setState({showEmoteMenu: true })
  }

  onDragStop = () => {
    this.setState({position: defaultPosition, isDragging: false })
  }

  onDrag = () => {
    console.log('OOOOH IM DRAGGIN')
    if(!this.state.isDragging) this.setState({ isDragging: true })
  }

  closeEmoteMenu = () => {
    this.setState({ showEmoteMenu: false });
  }

  selectEmotion = (emotion: string) => {
    this.setState({ showEmoteMenu: false });
    console.log('EMOTION SELECTED', emotion);
    // TODO: send emotion selection to server
  }

  render() {
    const {profileImage, text, me} = this.props;
    const klass = classnames({
      'speech-bubble': true,
      me
    });


    return (
      <ClickNHold
				time={1} // Time to keep pressing. Default is 2
				onStart={this.start} // Start callback
				onClickNHold={this.clickNHold} //Timeout callback
        onEnd={this.end}
        className='speech-bubble-wrapper'
        >
        <Draggable
          defaultPosition={defaultPosition}
          position={this.state.position}
          bounds={'body'}
          onDrag={this.onDrag}
          onStop={this.onDragStop}
          axis="x">
          <div className={klass}>
            <ProfilePicture src={profileImage} alt="account"/>
            <p>{text}</p>
            {this.state.showEmoteMenu && <EmoteMenu
              onClose={this.closeEmoteMenu}
              onSelect={this.selectEmotion}
              />}
          </div>
        </Draggable>
      </ClickNHold>
    )
  }

}
