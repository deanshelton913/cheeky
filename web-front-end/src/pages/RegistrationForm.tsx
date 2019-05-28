import React, { SyntheticEvent } from 'react';
import CheekyClient from 'data-access/cheeky-client';
import classNames from 'classnames';
import './RegistrationForm.scss';


interface Props {
  profileImages: string[]
  cheekyClient?: CheekyClient
}

interface State {
}

export class RegistrationForm extends React.Component<Props, State> {

  onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    this.props.cheekyClient!.post(`/api/users/me`, {images: this.props.profileImages})
  }

  isValid() {
    return (this.props.profileImages.length > 0)
  }

  render () {
    const isValid = this.isValid();
    const klasses = classNames({button: true, success: isValid, disabled: !isValid})
    return (
      <div className="registration-form">
        <form onSubmit={this.onSubmit}>
          <button className={klasses}>Register</button>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
