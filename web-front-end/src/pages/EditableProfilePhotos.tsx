import React from 'react';
import './EditableProfilePhotos.scss';
import { ProfilePicture } from 'ProfilePicture';
import { FacebookPhotoSelector } from './FacebookPhotoSelector';

export interface ProfileImage {
  src: string;
}

interface Props {
  images?: ProfileImage[];
  imageIndexUnderEdit?: number;
  onImageChange: (images: ProfileImage[]) => void
}

interface State {
  images: ProfileImage[];
  imageIndexUnderEdit?: number;
}


export class EditableProfilePhotos extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      images: this.props.images || [],
      imageIndexUnderEdit: this.props.imageIndexUnderEdit,
    }
  }

  toggleEdit = (imageIndex: number) => {
    console.log('now-editing', imageIndex)
    this.setState({ imageIndexUnderEdit: imageIndex })
  }

  getProfilePicture = (index: number) => {
    const { images } = this.state;
    const src = (images[index] ? images[index].src : undefined)
    const onClick = () => this.toggleEdit(index);
    return <ProfilePicture src={src} key={String(src)+index} onClick={onClick} />
  }

  onFacebookImageSelect = (images: Set<string>) => {
    console.log('Facebook Image selected for profile image', images)
  }

  render() {
    const primaryImage = this.getProfilePicture(0);
    const otherImages = [1,2,3,4].map(i => this.getProfilePicture(i))
    const { imageIndexUnderEdit } = this.state;
    return (
    <div className="editable-profile-photos">
      <div className="images">
        <div className="primary">{primaryImage}</div>
        <div className="other">{otherImages}</div>
      </div>
      <div className="edit">
        {imageIndexUnderEdit !== undefined
          && <FacebookPhotoSelector
            onSelect={this.onFacebookImageSelect}
            selectionAllotment={this.state.images.length-5}
          />}
      </div>
    </div>
    )
  }
}