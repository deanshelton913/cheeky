import React from 'react';
import './SelectableImage.scss'
const ClickNHold: any = require('react-click-n-hold').default;

interface SelectableImageProps {
  isSelected: boolean;
  onClick: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  src: string;
  selectedIndex: number;
  holdGestureCallback: (imageUrl: string) => void;
}

export default class SelectableImage extends React.PureComponent<SelectableImageProps,{}> {
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
				onClickNHold={() => holdGestureCallback(src)} // Timeout callback
        onEnd={this.end}
        className='selectable-image'
        >
        <figure
          className={isSelected ? 'selected' : 'selectable'}
          onClick={onClick}>
          <img
            src={src}
            key={src}
            alt="Loading From Facebook..." />
            <div className="selection-index">
              {selectedIndex < 0 ? undefined : selectedIndex + 1}
            </div>
        </figure>
        </ClickNHold>
    )
  }
}