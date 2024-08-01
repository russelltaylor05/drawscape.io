const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    router: {
      stripTrailingSlash: true
    },      
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>DrawScape</title>
        </head>
        <body>
          <h1>DrawScape</h1>
        </body>
        </html>
      `;
    }
  });

  server.route({
    method: 'GET',
    path: '/qrcode',
    handler: (request, h) => {
      const utmRedirect = request.query.utm_redirect;
      let redirectUrl;
      
      switch (utmRedirect) {
        case 'twitter':
          redirectUrl = 'https://x.com/russell161803';
          break;
        case 'instagram':
          redirectUrl = 'https://www.instagram.com/_draw_scape';
          break;
        default:
          redirectUrl = 'https://x.com/russell161803';
      }

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Redirecting...</title>
          <script type="text/javascript">
            window.location.href = '${redirectUrl}';
          </script>
        </head>
        <body>
          <p>If you are not redirected automatically, follow this <a href="${redirectUrl}">link</a>.</p>
        </body>
        </html>
      `;
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
