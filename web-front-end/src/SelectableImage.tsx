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

  render() {
    const { isSelected, onClick, src, selectedIndex, holdGestureCallback } = this.props;
    return (
      <ClickNHold
				time={1}
				onClickNHold={() => holdGestureCallback(src)} // Timeout callback
        className='selectable-image'
        >
        <figure
          className={isSelected ? 'selected' : 'selectable'}
          onClick={onClick}>
          <img
            src={src}
            key={src}
            alt="..." />
            <div className="selection-index">
              {selectedIndex < 0 ? undefined : selectedIndex + 1}
            </div>
        </figure>
        </ClickNHold>
    )
  }
}