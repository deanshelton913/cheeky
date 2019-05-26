import { FailureByDesign } from "FailureByDesign";

/*global FB*/
export interface DomWindow extends Window {
  fbAsyncInit: Function;
}

export const initFbApi = async () => {
  return new Promise((resolve, reject) => {
    try {
      (window as DomWindow).fbAsyncInit = () => {
        FB.init({
          appId      : '2160906307324498',
          cookie     : true,
          xfbml      : true,
          version    : 'v3.3'
        });

        FB.AppEvents.logPageView();

        FB.getLoginStatus((response) => {
          console.log('Checking logged in status....')
          if(response.authResponse){
            console.log('...logged in')
            return resolve(response);
          } else {
            console.log('...not logged in')
            return reject(new FailureByDesign('UNAUTHORIZED', 'facebook authentication required'))
          }
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};