// netlify/functions/signin.js
exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
  
    try {
      // Parse the request body
      const data = JSON.parse(event.body);
      const { email, password } = data;
      
      // Here, implement your authentication logic
      // This is where you'd check credentials against a database,
      // generate tokens, etc. - similar to what your backend was doing
      
      // For example:
      if (email === "test@example.com" && password === "testpassword123") {
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            success: true, 
            token: "sample-token-123",
            user: { id: 1, name: "Test User", email: email }
          })
        };
      } else {
        return {
          statusCode: 401,
          body: JSON.stringify({ success: false, message: "Invalid credentials" })
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: "Server error" })
      };
    }
  };