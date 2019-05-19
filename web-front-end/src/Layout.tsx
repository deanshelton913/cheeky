/*global FB*/
import React   from 'react';
import './Layout.scss';
import { Route } from 'react-router-dom';
import { DirectMessage } from 'pages/DirectMessage';
import { Welcome } from 'pages/Welcome';
import { Navigation } from 'Navigation';
import { DirectMessageList } from 'pages/DirectMessageList';
import { Me } from 'pages/Me';

interface MyProps {

}

interface MyState {
  photos: {source: string, id:string}[]
}


export class Layout extends React.Component<MyProps, MyState> {
  componentDidMount = () => {

  }

  logout = () => {
    FB.logout(() => {
      window.location.reload()
    })
  }


  render = () =>
    <div className="layout">
      <header>
        <Navigation />
      </header>
      <main>
        <Route path="/" exact component={Welcome} />
        <Route path="/me" exact component={Me} />
        <Route path="/dm/:uid" component={DirectMessage} />
        <Route path="/dms" component={DirectMessageList} />
      </main>
    </div>
}

export default Layout
