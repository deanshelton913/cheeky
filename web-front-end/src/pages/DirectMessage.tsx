import React, { SyntheticEvent } from 'react';
import './DirectMessage.scss';
import { SpeechBubble } from 'SpeechBubble';
import { ChatInput } from 'ChatInput';

interface UserMessage {
  message: string;
  user: {
    id: string,
    profileImage: string,
    name?: string
  }
}

interface Props {
  messages: UserMessage[]
}

interface State {
}


export class DirectMessage extends React.Component<Props, State> {

  chatSubmitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('SUBMIT')
  }

  render() {
    return (
    <section className="direct-message-page">
      <div className="chat">
        <SpeechBubble text="Testing Bananas" profileImage="/test.png" me />
        <SpeechBubble text="I'm testing." profileImage="/test2.png" />
        <SpeechBubble text="Dude" profileImage="/test.png" me />
        <SpeechBubble text="Testing Bananas" profileImage="/test.png"/>
        <SpeechBubble text="Testing Bananas" profileImage="/test.png"/>
        <SpeechBubble text="Testing Bananas" profileImage="/test.png"/>
        <SpeechBubble text="Dude, Shut up" profileImage="/test.png" me />
      </div>
      <div className="input">
        <ChatInput onSubmit={this.chatSubmitHandler} />
      </div>
    </section>
    )
 }
}