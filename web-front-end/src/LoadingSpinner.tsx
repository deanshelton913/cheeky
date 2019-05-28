import React from 'react';
import './LoadingSpinner.scss';

interface Props {
}

interface State {
  tooLong: boolean;
  interval?: NodeJS.Timeout;
}

export class LoadingSpinner extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tooLong: false,
    }
  }

  render() {
    return (
      <div className="loading-spinner">
        Loading...
        {this.state.tooLong &&
        <div>
          <p>This page is taking too long to load. Sorry!</p>
          <p>Make sure that your browser doesn't block Facebook Authentication.</p>
        </div>
        }
      </div>
    )
 }
}



