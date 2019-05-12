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
          console.log(response)
          const {accessToken, userID } = response.authResponse
          resolve({accessToken, userID, status: response.status});
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};