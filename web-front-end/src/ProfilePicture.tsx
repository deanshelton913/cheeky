import React, { MouseEventHandler } from 'react';
import './ProfilePicture.scss'
import cn from 'classnames';

interface Props {
  src: string;
  className?: string;
  alt?: string;
  onClick?: MouseEventHandler;
}

interface State {
  classNames: any
}

export class ProfilePicture extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      classNames: {
        profile: true,
        clickable: Boolean(this.props.onClick),
      }
    }

    if(this.props.className){
      this.state.classNames[this.props.className] = true;
    }
  }

  defaultOnClick = () => {}
  render() {
    return <img
      className={cn(this.state.classNames)}
      src={this.props.src || '/test.png'}
      alt={this.props.alt || 'Profile Picture'}
      onClick={this.props.onClick || this.defaultOnClick}
    />
  }
}