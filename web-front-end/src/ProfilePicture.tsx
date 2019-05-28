import React, { MouseEventHandler } from 'react';
import './ProfilePicture.scss'
import cn from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
  src?: string;
  className?: string;
  alt?: string;
  onClick?: MouseEventHandler;
  editText?: string;
  linkTo?: string;
}

interface State {
  classNames: any,
}

export class ProfilePicture extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      classNames: {
        'profile-picture': true,
        'empty': !Boolean(this.props.src),
      }
    }

    if(this.props.className) {
      this.state.classNames[this.props.className] = true;
    }
  }

  defaultOnClick = () => {console.log('defaultonclick')}
  render() {
    const img = this.props.src ? <img
      src={this.props.src}
      alt={this.props.alt || 'Profile Picture'}
    /> : undefined

    return (
      <figure
        onClick={this.props.onClick || this.defaultOnClick}
        className={cn(this.state.classNames)}>
      {this.props.linkTo
        ? <Link to={this.props.linkTo}>{img}</Link>
        : img}
    </figure>)
  }
}