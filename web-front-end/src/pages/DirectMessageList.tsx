import React from 'react';
import './DirectMessageList.scss';
import { Link } from 'react-router-dom';

interface Props {
}

interface State {
  directMessages: DmListItemProps[]
}

export class DirectMessageList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      directMessages: []
    }
  }
  componentDidMount = async () => {
    const dmListItems =  await this.getListItemsFromDms();
    this.setState({directMessages: dmListItems})
  }

  async getListItemsFromDms(){
    return FAKE_RESPONSE_FROM_SERVER.map((user: User) => ({
      path: `/dm/${user.id}`,
      title: user.displayName,
      tease: user.lastMessage.text,
      timestamp: user.lastMessage.timestamp
    }));
  }

  render() {
    return (
      <section>
        <ul className="list">
          {this.state.directMessages
          ? this.state.directMessages.map((item) => <DmListItem
            path={item.path}
            title={item.title}
            tease={item.tease}
            timestamp={item.timestamp}
            key={item.path}
            />
          )
          : []
          }
        </ul>
      </section>
    )
 }
}

interface DmListItemProps {
  path: string
  title: string
  tease: string
  timestamp: number
}

export class DmListItem extends React.PureComponent<DmListItemProps> {
  render() {
    return <li className="item">
      <Link to={this.props.path}>
        <span className="title"><div className="truncatedText">{this.props.title}</div></span>
        <span className="tease"><div className="truncatedText">{this.props.tease}</div></span>
        <span className="timestamp"><div className="truncatedText">{new Date(this.props.timestamp).toLocaleTimeString("en-US")}</div></span>
      </Link>
    </li>
  }
}








interface User {
  id: number;
  displayName: string;
  profileImage: string;
  lastMessage: {
    timestamp: number;
    text: string;
  }
}
const FAKE_RESPONSE_FROM_SERVER: User[] = [
  {
    id: 1,
    displayName: "Gary",
    profileImage: '/test.png',
    lastMessage: {
      timestamp: Date.now(),
      text: 'Yo Dawg. Whats good?'
    }
  },
  {
    id: 2,
    displayName: "Chuck",
    profileImage: '/test2.png',
    lastMessage: {
      timestamp: Date.now(),
      text: 'Yo Dawg. Whats good? Yo Dawg. Whats good? Yo Dawg. Whats good? Yo Dawg. Whats good?'
    }
  }
];
