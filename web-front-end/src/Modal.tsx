import React from 'react';
import './Modal.scss';

interface Props {
  onClose: () => void
}

interface State {
}


export class Modal extends React.Component<Props, State> {

  render() {
    return (
      <div className="modal-window">
        <div>
          <button onClick={this.props.onClose} className="modal-close">Close</button>
          <h1>Voilà!</h1>
        </div>
      </div>
    )
  }

}