module.exports = {
  //...
  settings: {
    cors: {
      enabled: true,
      headers: '*',
      origin: [
        'http://54.36.101.143',
        'http://54.36.101.143:1337',
        'http://localhost:3000',
        'http://localhost:1337',
        'http://gameart.fr',
        'http://gameart.fr:1337',
        'http://www.gameart.fr',
        'http://strapi.gameart.fr'
      ],
    },
  },
};