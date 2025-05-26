import orderModel from "../models/orderModel.js";

import userModel from "../models/userModel.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//Placing order for frontend

const placeOrder = async(req, res) =>{

    // variable for frontend url

    const frontend_url = "http://localhost:5174";   

    try {

        console.log("Received order request:");
console.log("User ID:", req.user?.id);
console.log("Items:", req.body.items);
console.log("Amount:", req.body.amount);
console.log("Address:", req.body.address);


        // create new Order 
        const newOrder = new orderModel({
            userId:req.user.id,
            items:req.body.items,
            amount:req.body.amount,
            address: req.body.address
        })

        // save 
        await newOrder.save();

    

        await userModel.findByIdAndUpdate(req.user.id,{cartData:{}});


        // items getting from user and create lineitems that is necessary for stripe payments 

        const line_items = req.body.items.map((item) =>({
            price_data:{
                currency:"cad",
                product_data:{
                    name:item.name
                },
                unit_amount:Math.round(item.price * 100)

            },
            quantity:item.quantity
        }))


        // adding delivery charge in the line_items

        line_items.push({
            price_data:{
                currency:"cad",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount: 200
            },
            quantity:1
        })

        //created a session for success url and cancel url 
        // Proper way of payment verification is web hooks but it is time consuming so 
        // i am using temporary payment verification system

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true, session_url:session.url})

    } catch (error) {
  console.error("Order placement failed:", error);
  res.status(500).json({
    success: false,
    message: "Order placement failed",
    error: error.message
  });
}


}



const verifyOrder = async(req,res) =>{
    const {orderId, success} = req.body;
    try {

        if(success=="true")
        {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true, message:"Paid"})
        }

        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not Paid"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}
 

// user orders for frontend

const userOrders = async(req,res) =>{

    try {
        const orders = await orderModel.find({userId:req.user.id});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//Listing orders for admin panel

const listOrders = async(req,res) =>{
    try{
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    }

    catch(error)
    {
        console.log(error);
        res.json({success:false, message:"Error"})
    }

}

// api for updating order status

const updateStatus = async(req,res) =>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true, message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus};