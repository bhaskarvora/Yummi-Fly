// import jwt from "jsonwebtoken"



// // middleware will basically take the token and convert it in the userid and using userid we can add remove or get the data from the Cart
// const authMiddleware = async(req , res, next) =>{

//     const{token} = req.headers;

//     if(!token)
//     {
//         return res.json({success:false, message: "Not Authorized Login Again"})        
//     }

//     try {
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();

//     } catch (error) {

//         console.log(error);
//         res.json({success:false,message:Error}) 

//     }

// }

// export default authMiddleware;



import jwt from "jsonwebtoken";

// Middleware to verify JWT and extract userId safely
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ✅ Safely store user ID in req.user
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
