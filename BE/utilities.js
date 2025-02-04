import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) { //this ismiddleware for authenticat token
  const authHeader = req.headers['authorization'];//getting token from the header...
    const token = authHeader && authHeader.split(' ')[1]; //splitting the token from  header

    if (!token ) return res.sendStatus(401); //this retuen if there is no token 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { //to verify the token
      if (err) return res.sendStatus(403); // an error return 
      req.user = user; // this set the user to the request
      next(); //call to the  next middleware
    });
}

export { authenticateToken };
