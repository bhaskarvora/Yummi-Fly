import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoredContext = createContext(null)

const StoredContextProvider = (props) => {


    const [cartItems, setCartItems] = useState({});

    const url ="http://localhost:4000"
    const [token, setToken] = useState("");

    const[food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => (({ ...prev, [itemId]: 1 })))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if(token)
        {
            await axios.post(url+"/api/cart/add", {itemId},{headers:{
            Authorization: `Bearer ${token}`}})
        }
    }


    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{Authorization: `Bearer ${token}`}})
        }
    }

    {/* To check in the console log when we click on inspect  that that which fooditem is added and which food item is deleted */ }


    const getTotalCartAmount = () => {
        let totalAmont = 0;
        for (const item in cartItems) {

            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmont += itemInfo.price * cartItems[item];
            }


        }

        return totalAmont;
    }

    const fetchFoodList = async() =>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) =>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{Authorization: `Bearer ${token}`}})
        setCartItems(response.data.cartData);
    }

    useEffect(() =>{
       

        async function loadData(){
            await fetchFoodList();
             if(localStorage.getItem("token"))
        {
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }
        }

        loadData();
    },[])


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoredContext.Provider value={contextValue}>
            {props.children}
        </StoredContext.Provider>
    )

}

export default StoredContextProvider;