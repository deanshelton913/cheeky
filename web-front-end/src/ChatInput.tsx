
import React, { EventHandler, SyntheticEvent } from 'react';
import './ChatInput.scss'

interface Props {
  buttonText?: string;
  inputClassName?: string;
  buttonClassName?: string;
  onTextChange?: EventHandler<SyntheticEvent>
  onSubmit?: EventHandler<SyntheticEvent>
}

export class ChatInput extends React.Component<Props> {
  inputForm: React.RefObject<HTMLFormElement>;

  constructor(props:Props) {
    super(props)
    this.inputForm = React.createRef();
  }

  defaultOnSubmit() {
    console.log('default submit')
  }

  componentDidMount(){
    // scroll to the bottom when the page loads.
    this.inputForm.current!.scrollIntoView()
  }

  render () {

    return (
      <form ref={this.inputForm} className="chat-input" onSubmit={this.props.onSubmit || this.defaultOnSubmit}>
        <textarea
          className={this.props.inputClassName}
          onChange={this.props.onTextChange}
          ></textarea>
        <button
          className={this.props.buttonClassName}
          >{this.props.buttonText || 'SEND'}</button>
      </form>
    )
  }
}