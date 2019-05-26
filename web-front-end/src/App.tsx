import React, { createContext } from 'react';
import './App.scss';
import { initFbApi } from './initFb';
import Layout from './Layout';
import CheekyClient from './data-access/cheeky-client';
import { BrowserRouter } from 'react-router-dom';
import { Login } from 'Login';
import { LoadingSpinner } from 'LoadingSpinner';

export const AppContext = createContext({} as AppState);


interface MyProps {}
export interface AppState {
  isLoading: boolean;
  isLoggedIn: boolean;
  cheekyClient?: CheekyClient;
  userID?: number;
  accessToken?: string;
}

export class App extends React.Component<MyProps, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: true,
      isLoggedIn: false,
      cheekyClient: undefined,
      userID: undefined,
    }
  }

  onLoginSuccess = (response: any) => {
    const { status, authResponse: { userID, accessToken } } = response;
    const cheekyClient = new CheekyClient(accessToken, userID);
    const isLoading = false;
    const isLoggedIn = (status === 'connected');
    this.setState({ accessToken, cheekyClient, isLoading, isLoggedIn, userID })
  }

  onLoginFailure = () => {
    console.log('login-fail')
    const isLoading = false;
    const isLoggedIn = false;
    this.setState({ isLoading, isLoggedIn })
  }


  componentDidMount = async () => {
    try {
      const response = await initFbApi() as any;
      this.onLoginSuccess(response);
    } catch (e) {
      this.onLoginFailure()
    }
  }

  render () {
    return (
    <BrowserRouter>
      <div className="app">
        <AppContext.Provider value={{ ...this.state }} >
          {this.state.isLoading
          ? <LoadingSpinner />
          : this.state.isLoggedIn
            ? <Layout />
            : <Login onLoginFailure={this.onLoginFailure} onLoginSuccess={this.onLoginSuccess} />
          }
        </AppContext.Provider>
      </div>
    </BrowserRouter>);
  }
}

export default App;
