
export default async function homepage(_req, res) {
  console.log('Homepage.')
  res.status(200).send(`
  <html>
    <head>
      <title>homepage</title>
    </head>
    <body>
      <script>
        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      </script>
      <div id="image_dropzone"></div>
    </body>
  </html>`);
}
