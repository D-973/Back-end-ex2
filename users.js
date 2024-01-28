const https = require('https');

const getUsers = (callback) => {
  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    path: '/users',
    method: 'GET',
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const users = JSON.parse(data);
      callback(null, users);
    });
  });

  req.on('error', (err) => {
    callback(err);
  });

  req.end();
};

module.exports = { getUsers };
