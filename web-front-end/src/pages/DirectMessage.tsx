import React, { SyntheticEvent } from 'react';
import './DirectMessage.scss';
import { SpeechBubble } from 'SpeechBubble';
import { ChatInput } from 'ChatInput';

// Disable click/hole right-click menu
window.addEventListener("contextmenu", function(e) { e.preventDefault(); })

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
        <SpeechBubble text="There's pros and cons to every alternate timeline. Fun facts about this one – It's got giant, telepathic spiders, 11 9/11s, and the best ice cream in the multiverse! Not for the men they cheat on. Oh, wow. That's an intense line of questioning, Snuffles Not MY fault this is happening." profileImage="/test.png" me />
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