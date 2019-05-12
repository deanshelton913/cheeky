import React, { createContext } from 'react';
import './App.css';
import { initFbApi, DomWindow } from './initFb';
import Layout from './Layout';
const { Provider } = createContext({});

interface MyProps {}
interface MyState {
  isLoading: boolean;
  isLoggedIn: boolean;
}

export class App extends React.Component<MyProps, MyState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      isLoggedIn: false
    }
  }

  componentDidMount = async () => {
    const {accessToken, userID, status} = await initFbApi() as any;
    console.log({accessToken, userID, status})
    await fetch('http://localhost:8080/protected', {headers: {Authorization: `${userID} ${accessToken}`}})

    this.setState({
      isLoading: false,
      isLoggedIn: (status === 'connected')
    })
  }

  componentDidUpdate = () => {
    (window as DomWindow).fbAsyncInit()
  }

  render () {
    return (
      <div className="app">
        <Provider value={{ state: this.state, }} >
          {this.state.isLoggedIn
            ? <Layout />
            : <div className="logo-wrapper">
                <div className="fb-login-button"
                  data-width=""
                  data-size="large"
                  data-button-type="continue_with"
                  data-auto-logout-link="true"
                  data-use-continue-as="true"
                  />
              </div>
            }
        </Provider>
      </div>
    );
  }
}

export default App;
