import React from 'react';
import './EditableProfilePhotos.scss';
import { ProfilePicture } from 'ProfilePicture';
import { FacebookPhotoSelector } from './FacebookPhotoSelector';


interface Props {
  images?: string[];
  onImageChange: (images: string[]) => void
  onFacebookFormToggle: () => void
}

interface State {
  images: string[];
  showFacebookPhotoSelector: boolean;
}


export class EditableProfilePhotos extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      images: this.props.images || [],
      showFacebookPhotoSelector: false
    }
  }

  toggleFacebookImageStream = () => {
    this.setState({ showFacebookPhotoSelector: true }, () => {
      this.props.onFacebookFormToggle()
    })
  }

  removePhoto(index: number) {
    const images = this.state.images.slice(0);
    images.splice(index, 1);
    this.setImages(images);
  }

  setImages(images: string[]) {
    this.setState({images}, () => {
      this.props.onImageChange(images)
    })
  }

  getProfilePicture = (index: number) => {
    const { images } = this.state;
    const src = (images[index] ? images[index] : undefined)
    const onClick = src
      ? () => this.removePhoto(index)
      : this.toggleFacebookImageStream
    return <ProfilePicture
      src={src}
      key={String(src)+index}
      onClick={onClick} />
  }

  onFacebookImageSelect = (newImages: string[]) => {
    const clone = this.state.images.slice(0)
    const images = clone.concat(newImages);
    this.setState({images, showFacebookPhotoSelector: false}, () => {
      this.props.onImageChange(images)
      this.props.onFacebookFormToggle()
    })
  }

  render() {
    const primaryImage = this.getProfilePicture(0);
    const otherImages = [1,2,3,4].map(i => this.getProfilePicture(i))
    return (
    <div className="editable-profile-photos">
      <div className="images">
        <div className="primary">{primaryImage}</div>
        <div className="other">{otherImages}</div>
      </div>
      <div className="edit">
        {this.state.showFacebookPhotoSelector
          && <FacebookPhotoSelector
            onSelect={this.onFacebookImageSelect}
            selectionAllotment={5-this.state.images.length}
          />}
      </div>
    </div>
    )
  }
}