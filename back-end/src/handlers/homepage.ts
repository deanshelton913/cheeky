
export default async function homepage(_req, res) {
  console.log('Homepage.')
  res.status(200).send(`
  <html>
    <head>
      <title>homepage</title>
    </head>
    <body>
      <p>Hi!</p>
      <fb:login-button
        scope="public_profile,email,user_photos"
        onlogin="checkLoginState();">
      </fb:login-button>
      <script>
        window.fbAsyncInit = function() {
          FB.init({
            appId      : '2160906307324498',
            cookie     : true,
            xfbml      : true,
            version    : 'v3.3'
          });

          FB.AppEvents.logPageView();

        };

        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        function checkLoginState() {
          FB.getLoginStatus(function(response) {
            console.log(response);
            FB.api('me/photos?fields=height,width,source', function(images){
              var dropzone = document.getElementById('image_dropzone')
              images.data.forEach(function(img) {
                let imgEl = document.createElement('img');
                imgEl.src = img.source;
                imgEl.height = img.height;
                imgEl.width = img.width;
                dropzone.appendChild(imgEl);
              })
            })
          });
        }
      </script>
      <div id="image_dropzone"></div>
    </body>
  </html>`);
}
