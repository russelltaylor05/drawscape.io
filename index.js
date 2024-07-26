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
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Redirecting...</title>
          <script type="text/javascript">
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
          </script>
        </head>
        <body>
          <p>If you are not redirected automatically, follow this <a href="https://example.com">link</a>.</p>
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
