import React from 'react';
import './Register.scss';
import { EditableProfilePhotos } from './EditableProfilePhotos';


interface Props {
  onRegistrationSuccess: any
  onRegistrationFailure: any
}

interface State {
}

export class Register extends React.Component<Props, State> {

  onImageChange = () => {

  }
  render () {

    return (
      <div className="registration-page">
        <EditableProfilePhotos onImageChange={this.onImageChange} />
      </div>
    );
  }
}

export default Register;
