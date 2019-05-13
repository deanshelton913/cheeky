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
          const { status, authResponse: {accessToken, userID} } = response
          resolve({accessToken, userID, status});
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};