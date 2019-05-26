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
  componentWillUnmount = () => {
    if(this.state.interval) {
      clearTimeout(this.state.interval)
    }
  }

  componentDidMount = () => {
    this.setState({
      interval: setTimeout(() => {
      this.setState({ tooLong: true })
    }, 5000)})

  }

  render() {
    return (
      <div className="loading-spinner">
        <figure><img src="/loading.gif" alt="loading"/></figure>
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



