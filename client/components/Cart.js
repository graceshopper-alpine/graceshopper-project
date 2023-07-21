import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";


const Cart = () => {

    const dispatch = useDispatch();

    //connect to the sessionId in redux store
    const sessionId = useSelector((state) => state.main.sessionId);

    //connect to the cartId in redux store
    const cartId = useSelector((state) => state.main.cartId);
    const cart = useSelector((state) => state.main.cart);

    const addToCart = async (id) => {
        try {
            let cartId = await axios.post("/api/orders/cartadd", {
                productId: id,
                sessionId: sessionId,
            })

            let cart = await axios.get(`/api/sessions/${sessionId}/cart`);
            cart = cart.data.order_items;
            dispatch({
              type: "main/setCart",
              payload: cart,
            });

        } catch (err) {
            if (err.response && err.response.data) {
                console.log(err.response.data);
            } else {
                console.log(err);
            }
        }
    }

    const removeFromCart = async (id) => {
        try {
            let cartId = await axios.post("/api/orders/cartremove", {
                productId: id,
                sessionId: sessionId,
            })

            let cart = await axios.get(`/api/sessions/${sessionId}/cart`);
            cart = cart.data.order_items;
            dispatch({
              type: "main/setCart",
              payload: cart,
            });
      
      
        } catch (err) {
            if (err.response && err.response.data) {
                console.log(err.response.data);
            } else {
                console.log(err);
            }
        }
    }


    if(cart.length > 0) {
        return (
            <div className="cart-page">

                <div className="cart-container">
                        <h1 className="fancy-font">Your Cart</h1>

                        {cart.toSorted((a, b)=> a.id - b.id).map((p) => {
                            return (
                            <>
                            <div key={`Product: ${p.id}`} className="cart-item">
                                <img src={`https://picsum.photos/seed/${p.product.id}/200`}></img>
                                
                                <div className="cart-item-details">
                                    <h2>{p.product.name}</h2>

                                    <span className="quantity-span">
                                        <i class="fa-solid fa-plus" onClick={()=>addToCart(p.product.id)}></i>
                                        <p>Qty: {p.quantity}</p>
                                        <i class="fa-solid fa-minus" onClick={()=>removeFromCart(p.product.id)}></i>
                                    </span>

                                </div>
                                <h3>{'$' + (parseFloat(p.product.price.replace('$', ''))*parseInt(p.quantity)).toFixed(2)}</h3> 

                                
                            </div>

                            <hr />

                            </>
                            )
                        })}
                </div>

                <div className="cart-summary">
                    <h1 className="fancy-font">Subtotal</h1>
                    <h3>{'$' + cart.reduce((a, b) => a + (parseFloat(b.product.price.replace('$', '')) * parseInt(b.quantity)), 0).toFixed(2)}</h3>
                    {/* on click redirect to checkout route */}
                    <button onClick={()=> window.location.href='/checkout'}>Checkout</button>
                </div>


            </div>
        );
    }

    else {
        return (
            <div className="cart-empty">
                <h1 className="fancy-font">Your Cart</h1>
                <p>Looks like your cart is empty.</p>
                <Link to="/products">Continue Shopping.</Link>
            </div>
        );
    }
}

export default Cart;