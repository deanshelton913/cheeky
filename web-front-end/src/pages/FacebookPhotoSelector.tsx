/*global FB*/
import React from 'react';
import './FacebookPhotoSelector.scss';
import BottomScrollListener from 'react-bottom-scroll-listener'
import SelectableImage from 'SelectableImage';

interface Props {
  onSelect: (selectedPhotos: Set<string>) => void
  selectionAllotment: number
}

interface State {
  photoStream: string[]
  selected: Set<string>
  next?: string
  preview?: string
  isLoading: boolean
}


export class FacebookPhotoSelector extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      photoStream: [],
      selected: new Set(),
      next: undefined,
      preview: undefined,
      isLoading: false,
    }
  }

  appendPhotoStream = (response: any) =>{
    let photoStream = this.state.photoStream.slice(0); // clone
    response.data.map((i: any) => photoStream.push(i.source))
    this.setState({
      next: response.paging.next,
      isLoading: false,
      photoStream
    })
  }

  componentDidMount = () => {
    this.setState({ isLoading: true })
    FB.api(`/me/photos?fields=source&limit=10`, this.appendPhotoStream)
  }

  next = () => {
    if(!this.state.isLoading) {
      this.setState({ isLoading: true })
      FB.api(this.state.next!, this.appendPhotoStream)
    }
  }

  done = () => {
    this.props.onSelect(this.state.selected)
  }


  imageClickHandler = (src: string) => {
    this.state.selected.has(src) ? this.removeImage(src) : this.addImage(src);
  }

  addImage = (src: string) => {
    const selected = new Set(this.state.selected)
    if(selected.size < 5) {
      selected.add(src);
      this.setState({selected})
    }
  }

  previewImage = (src: string) => {
    this.setState({preview: src})
  }

  previewImageClose = () => {
    this.setState({preview: undefined})
  }

  removeImage = (src: string) => {
    const selected = new Set(this.state.selected)
    selected.delete(src)
    this.setState({selected})
  }

  render() {
    const { preview, photoStream, selected, isLoading } = this.state;
    return (
      <div className="facebook-photo-selector">
        {preview && <ImagePreview src={preview} closeCallback={this.previewImageClose} />}
        <div className="selectable-photos">
          {[...photoStream].map(src => (
            <SelectableImage
              key={src}
              isSelected={selected.has(src)}
              onClick={() => this.imageClickHandler(src)}
              selectedIndex={[...selected].indexOf(src)}
              holdGestureCallback={this.previewImage}
              src={src}
            />
          ))}
          {this.next && <BottomScrollListener onBottom={this.next} />}
          <button
            className="button success done"
            onClick={this.done}>Done</button>
          {isLoading
            ? <div className="loading">loading...</div>
            : <div className="more">&#8675;</div>
          }
        </div>
    </div>
    )
  }
}









interface ImagePreviewProps {
  src: string;
  closeCallback: () => void;
}

class ImagePreview extends React.PureComponent<ImagePreviewProps,{}> {

  render() {
    const {src, closeCallback } = this.props;
    return (
      <div className="image-preview" onClick={closeCallback}>
        <figure>
          <img
            src={src}
            alt="Preview" />
        </figure>
      </div>
    )
  }
}