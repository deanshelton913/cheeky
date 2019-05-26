/*global FB*/
import React from 'react';
import './MeEdit.scss';
import { LoadingSpinner } from 'LoadingSpinner';
import { AppContext, AppState } from 'App';
const ClickNHold: any = require('react-click-n-hold').default;

interface Props {
  userID: number
  context: any
}

interface State {
  photos: Set<string>
  selected: Set<string>
  next?: string
  previous?: string
  preview?: string
  isLoading: boolean
}


export class MeEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      photos: new Set(),
      selected: new Set(),
      next: undefined,
      previous: undefined,
      preview: undefined,
      isLoading: false,
    }
  }

  refreshFbData = (response: any) =>{
    let photos = new Set()
    response.data.map((i: any) => photos.add(i.source))
    this.setState({
      next: response.paging.next,
      previous: response.paging.previous,
      isLoading: false,
      photos
    })
  }

  componentDidMount = () => {
    this.setState({ isLoading: true })
    FB.api(`/me/photos?fields=source&limit=10`, this.refreshFbData)
  }

  next = () => {
    this.setState({ isLoading: true })
    FB.api(this.state.next!, this.refreshFbData)
  }

  previous = () => {
    this.setState({ isLoading: true })
    FB.api(this.state.previous!, this.refreshFbData)
  }

  done = () => {
    this.setState({ isLoading: true })
    console.log(this.props.context)
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
    const { preview, previous, next, photos, selected, isLoading } = this.state;
    return (
      <div className="me-edit">
        <h1>Edit Photos</h1>
        {isLoading && <LoadingSpinner />}
        {preview && <ImagePreview src={preview} closeCallback={this.previewImageClose} />}
        <div className="photo-nav-group">
          <div className="selectable-photos">
            {previous && <button className="button" onClick={this.previous}>Previous</button>}
            {[...photos].map(src => (
              <SelectableImage
                key={src}
                isSelected={selected.has(src)}
                onClick={() => this.imageClickHandler(src)}
                selectedIndex={[...selected].indexOf(src)}
                holdGestureCallback={this.previewImage}
                src={src}
              />
            ))}
            {next && <button className="button" onClick={this.next}>Next</button>}
            <AppContext.Consumer>
              {appState => <DoneButton appState={appState} />}
            </AppContext.Consumer>
          </div>
        </div>

    </div>
    )
  }
}

class DoneButton extends React.PureComponent<{appState: AppState},{}> {
  done = async () => {
    const { userID, accessToken, cheekyClient } = this.props.appState;
    await cheekyClient!.put(`/user/${userID}/?token=${accessToken}`, {});
  }

  render () {
    return <button className="button success" onClick={this.done}>Done</button>
  }
}

interface SelectableImageProps {
  isSelected: boolean;
  onClick: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  src: string;
  selectedIndex: number;
  holdGestureCallback: (imageUrl: string) => void;
}

class SelectableImage extends React.PureComponent<SelectableImageProps,{}> {
  start(e: any){
		console.log('START');
	}

	end(e: any, enough: any){
		console.log('END');
    console.log(enough ? 'Click released after enough time': 'Click released too soon');
	}

	clickNHold = (e: any) => {
    console.log('PREVIEW THIS', e)
  }

  render() {
    const { isSelected, onClick, src, selectedIndex, holdGestureCallback } = this.props;
    return (
      <ClickNHold
				time={1} // Time to keep pressing. Default is 2
				onStart={this.start} // Start callback
				onClickNHold={() => holdGestureCallback(src)} //Timeout callback
        onEnd={this.end}
        className='image-wrapper'
        >
        <figure
          className={isSelected ? 'selected' : 'selectable'}
          onClick={onClick}>
          <img
            src={src}
            key={src}
            alt="Selectable" />
            <span className="index">{selectedIndex + 1}</span>
        </figure>
        </ClickNHold>
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
      <div className="image-preview">
        <figure onClick={closeCallback}>
          <img
            src={src}
            alt="Preview" />
        </figure>
      </div>
    )
  }
}