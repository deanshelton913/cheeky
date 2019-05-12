/*global FB*/
import React from 'react';
import './Layout.css';

interface MyProps {

}

interface MyState {
  photos: {source: string, id:string}[]
}


export class Layout extends React.Component<MyProps, MyState> {
  constructor(props: any){
    super(props);
    this.state = {
      photos: []
    }
  }
  componentDidMount = () => {
    FB.api('/me/photos?fields=source', ({data}: any) => {
      this.setState({ photos: data })
    })
  }

  logout = () => {
    FB.logout(() => {
      window.location.reload()
    })
  }

  render = () =>
    <div className="layout">
    <h1>I am a heading</h1>
      <div className="grid">
        {this.state.photos.map((p) => <img className="selectableImage" src={p.source} alt="bananas"/>)}
      </div>
      <div><button className="logout" onClick={this.logout}>LOGOUT</button></div>
    </div>
}

export default Layout
