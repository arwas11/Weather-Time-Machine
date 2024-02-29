/**
 * This middleware parses the username and password from the Authorization
 * header in the request, and attaches them to req.user
 */
function basicAuth(req, res, next) {
    try {
      const authHeader = req.headers.authorization; //This specifically accesses the value of the Authorization header, which is commonly used to transmit credentials for authentication purposes.
  
      if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({
          error: "Unauthorized user: Please login/sign up",
        });
      }

      //this line isolates the base64-encoded credentials from the Authorization header and stores them in the encodedCredentials variable for subsequent decoding and credential extraction.
      const encodedCredentials = authHeader.split(" ")[1];

      //this creates a Buffer object, which represents a raw binary data sequence in Node.js. It takes two arguments:
      //1-encodedCredentials: The base64-encoded string containing the credentials.
      //2-'base64': This specifies that the input string is in base64 encoding, instructing Node.js to decode it accordingly.
      const decodedCredentials = Buffer.from(
        encodedCredentials,
        "base64"
      ).toString("utf-8"); //toString is called on the Buffer object to convert the decoded binary data back into a human-readable string. The 'utf-8' argument specifies that the string should be encoded using UTF-8 character encoding, which is a common standard for representing text in a variety of languages.
  
      //the result of the above will be in this format "username:password123"?????
      const [username, password] = decodedCredentials.split(":");
      if (!username  || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
  
      req.user = { username, password };
  
      next();
    } catch (error) {
      next(error);
    }
  }
  
  module.exports = basicAuth;
  