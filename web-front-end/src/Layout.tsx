/*global FB*/
import React from 'react';
import './Layout.scss';

interface MyProps {

}

interface MyState {
  photos: {source: string, id:string}[]
}


export class Layout extends React.Component<MyProps, MyState> {
  // constructor(props: any){
  //   super(props);
  //   this.state = {
  //     photos: []
  //   }
  // }
  componentDidMount = () => {

  }

  logout = () => {
    FB.logout(() => {
      window.location.reload()
    })
  }

  render = () =>
    <div className="layout">
      <div className="content-area">
        <div className="settings-gear">
          <img src="./gear.png" alt="settings"/>
        </div>
        <div className="logo"></div>
        <div className="account">
          <img src="./test.png" alt="account"/>
        </div>
        <main className="body">
        </main>
        <footer>
          <button className="logout" onClick={this.logout}>LOGOUT</button>
        </footer>
      </div>
    </div>
}

export default Layout
