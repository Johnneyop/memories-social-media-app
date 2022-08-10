import jwt from "jsonwebtoken";

const secret = 'test';

 // steps:
 // user wants to like something
 // click button
 // middle ware checks 
 // auth middleware denies or denies that request
 // calls (next) to go to controller
 const auth = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500; //token length greater than 500 is google auth but less than that is its our own auth
   
      let decodedData;
  
      if (token && isCustomAuth) {      
        decodedData = jwt.verify(token, secret);
  
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
  
        req.userId = decodedData?.sub;  // sub is google name for id to be unique
      }    
  
      next();
    } catch (error) {
      console.log(error);
    }
  };
  
  export default auth;