import React from "react";
import './EmoteMenu.scss'
import cn from 'classnames'

interface Props {
  onClose: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
  onSelect: ((icon: string) => void)
}

interface State {
  afterMount: boolean
}

export class EmoteMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { afterMount: false }
  }

  componentWillMount() {
    this.animateShow();
  }

  animateClose = (e: any) => {
    this.animateHide(() => {
      this.props.onClose(e);
    });
  }

  animateShow(){
    setTimeout(() => { this.setState({afterMount: true}) }, 50)
  }

  animateHide(done: any = () => {}){
    this.setState({afterMount: false}, () => { setTimeout(() => { done(); }, 500); })
  }

  render() {
    return <div className={cn({'animation-trigger': !this.state.afterMount, 'emote-menu': true })}>
      <div className="emoji close" onClick={this.animateClose} />
      <div className="emoji like" onClick={() => this.animateHide(() => this.props.onSelect('like'))} />
      <div className="emoji happy" onClick={() => this.animateHide(() => this.props.onSelect('happy'))} />
      <div className="emoji sad" onClick={() => this.animateHide(() => this.props.onSelect('sad'))} />
      <div className="emoji mad" onClick={() => this.animateHide(() => this.props.onSelect('mad'))} />
    </div>
  }

}
