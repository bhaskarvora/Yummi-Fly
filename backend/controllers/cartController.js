// import userModel from "../models/userModel.js";

// // add items to the user cart

// const addToCart= async(req,res) =>{
//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = await userData.cartData;

//         if(!cartData[req.body.itemId])
//         {
//             cartData[req.body.itemId] = 1
//         }

//         else{
//             cartData[req.body.itemId] += 1;
//         }

//         await userModel.findByIdAndUpdate(req.body.userId, {cartData});
//         res.json({success:true, message:"Added to the cart"})

//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:"Error"})
//     }

// }


// //remove items from the cart

// const removeFromCart = async(req,res) =>{
//         try {
//             let userData = await userModel.findById(req.body.userId)
//             let cartData = await userData.cartData;
            
//             if(cartData[req.body.itemId] > 0) {
//                 cartData[req.body.itemId] -=1;
//             }

//             await userModel.findByIdAndUpdate(req.body.userId, {cartData});
//             res.json({success:true, message:"Removed from Cart"})


//         } catch (error) {
//             console.log(error);
//             res.json({success:false, message:"Error"})
            
//         }


// }


// //fetch user cart data

// const getCart = async(req,res) =>{


//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = await userData.cartData;
//         res.json({success:true, cartData})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:"Error"})
//     }
// }

// export {addToCart,removeFromCart,getCart}





import userModel from "../models/userModel.js";

// Add item to user cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.body.itemId;

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to the cart" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.body.itemId;

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Removed from Cart" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get cart data
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
