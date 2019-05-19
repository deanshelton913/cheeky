import React, { MouseEventHandler } from 'react';
import './ProfilePicture.scss'
import cn from 'classnames';

interface Props {
  src: string;
  className?: string;
  alt?: string;
  onClick?: MouseEventHandler;
  editText?: string;
  showEdit?: boolean;
  onEditClick?: MouseEventHandler;
}

interface State {
  classNames: any,
  showEdit: boolean
}

export class ProfilePicture extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showEdit: this.props.showEdit || false,
      classNames: {
        clickable: Boolean(this.props.onClick),
      }
    }

    if(this.props.className){
      this.state.classNames[this.props.className] = true;
    }
  }

  defaultOnClick = () => {}
  render() {
    return <figure className="profile-picture">
        <img
        className={cn(this.state.classNames)}
        src={this.props.src || '/test.png'}
        alt={this.props.alt || 'Profile Picture'}
        onClick={this.props.onClick || this.defaultOnClick}
      />
      <div
        className={cn({'edit-menu': true, show: this.state.showEdit})}
        onClick={this.props.onEditClick}
      >
        {this.props.editText || 'EDIT'}
      </div>
    </figure>
  }
}