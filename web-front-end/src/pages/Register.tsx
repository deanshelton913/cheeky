import React from 'react';
import './Register.scss';
import { EditableProfilePhotos } from './EditableProfilePhotos';
import { AppContext } from 'App';
import RegistrationForm from './RegistrationForm';


interface Props {
  onRegistrationSuccess: any
  onRegistrationFailure: any
}

interface State {
  selectedImages: string[]
  showForm?: boolean
}

export class Register extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedImages: [],
      showForm: true
    }
  }

  onImageChange = (selectedImages: string[]) => {
    console.log('IMAGE CHANGE',selectedImages);
    this.setState({selectedImages})
  }

  onFacebookFormToggle = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  render () {
    console.log(this.state.showForm, this.state.selectedImages)
    return (
      <div className="registration-page">
        <EditableProfilePhotos
          onImageChange={this.onImageChange}
          onFacebookFormToggle={this.onFacebookFormToggle}
        />
        {this.state.showForm && this.state.selectedImages.length > 0 &&
          <AppContext.Consumer>
            {appState =>
              <RegistrationForm
                profileImages={this.state.selectedImages}
                cheekyClient={appState.cheekyClient}
              />
            }
          </AppContext.Consumer>
        }
      </div>
    );
  }
}

export default Register;
