module.exports = ({ env }) => ({
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: 'noloxe.web@gmail.com',
      defaultReplyTo: 'noloxe.web@gmail.com',
      testAddress: 'noloxe.web@gmail.com',
    },
  },
});
