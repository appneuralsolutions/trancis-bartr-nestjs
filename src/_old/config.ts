export default {
  domain: '64.227.166.146:3000',
  db: {
    user: null,
    pass: null,
    host: 'localhost',
    port: '27017',
    database: 'user-admin',
    authSource: null,
  },
  host: {
    url: '<server-url>',
    port: '3000',
  }, 
  isSecure: false,
  isInternalIp: true,
  servicePort: 3000,
  jwt: {
    secretOrKey: 'secret',
    expiresIn: 36000000,
  },
  auditLogging: true,
  mail: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    user: 'gayari.trancis@gmail.com',
    pass: 'Kailash@123',
  },
};
