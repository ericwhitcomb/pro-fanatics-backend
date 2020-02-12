const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('authenticate');
  const token = req.headers.authorization;
  console.log('authenticate a');
  if (token) {
    console.log('authenticate if');
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      console.log('authenticate if verify');
      if (err) {
        console.log('authenticate if verify if');
        res.status(401).json({ message: 'Invalid token' });
      } else {
        console.log('authenticate if verify else');
        req.user = decodedToken.user;
        console.log('authenticate if verify else a');
        next();
      }
    });
  } else {
    console.log('authenticate else');
    res.status(401).json({ message: 'No token provided' });
  }
};