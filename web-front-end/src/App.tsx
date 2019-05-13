import React, { createContext } from 'react';
import './App.scss';
import { initFbApi, DomWindow } from './initFb';
import Layout from './Layout';
import CheekyClient from './data-access/cheeky-client';
const { Provider } = createContext({});

interface MyProps {}
interface MyState {
  isLoading: boolean;
  isLoggedIn: boolean;
  cheekyClient?: CheekyClient
}

export class App extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: true,
      isLoggedIn: false,
      cheekyClient: undefined,
    }
  }

  componentDidMount = async () => {
    const {accessToken, userID, status} = await initFbApi() as any;
    this.setState({
      cheekyClient: new CheekyClient(accessToken, userID),
      isLoading: false,
      isLoggedIn: (status === 'connected')
    }, () => {
      console.log('updated...', this.state.isLoggedIn)
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
