
const setupSwagger = {
    swaggerDefinition: {
      info: {
        description: 'API documentation for ironpal API in local developpement',
        title: 'Ironpal API',
        version: '1.0.0',
      },
      host: 'localhost:3000',
      basePath: '/',
      produces: [
        'application/json',
      ],
      schemes: ['http'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: "",
      }
      },
      
    },
    basedir: __dirname, // app absolute path
    files: ['./src/routers/*.ts'], // Path to the API handle folder
  };

  export default setupSwagger;