import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {

    const dispatch = useDispatch();

    //connect to the sessionId in redux store
    const sessionId = useSelector((state) => state.main.sessionId);

    //connect to the cartId in redux store
    const cartId = useSelector((state) => state.main.cartId);
    const cart = useSelector((state) => state.main.cart);


    if(cart.length > 0) {
        return (
            <div>
                <h1>Cart</h1>
                <ul>
                    {cart.map((p) => {
                        return (
                        <div key={`Product: ${p.id}`}>
                            <img src={p.product.image_url}></img>
                            Product: {p.product.name}
                            Quantity: {p.quantity}
                            Price: {p.product.price}
                        </div>
                        )
                    })}
                </ul>
            </div>
        );
    }

    else {
        return (
            <div>
                <h1>Cart</h1>
                <p>Looks like your cart is empty.</p>
                <Link to="/products">Add Some Products!</Link>
            </div>
        );
    }
}

export default Cart;