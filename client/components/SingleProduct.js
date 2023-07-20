import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProductSlice";
import axios from "axios";

const SingleProduct = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const singleProduct = useSelector((state) => {
        return state.singleProductSlice.singleProduct
    })

    const sessionId = useSelector((state) => state.main.sessionId)

    useEffect(() => {
        dispatch(fetchSingleProduct(id))
    }, [dispatch, id])
    

    const addToCart = async (id) => {
        try {
            let cartId = await axios.post('/api/orders/cartadd', {
                'productId': id,
                'sessionId': sessionId 
            })
            
            cartId = cartId.data.cartId;
            dispatch({
                type: 'main/setCartId',
                payload: cartId
            })

            let cart = await axios.get(`/api/sessions/${sessionId}/cart`)
            cart = cart.data.order_items
            dispatch({
                type: 'main/setCart',
                payload: cart
            })

        } catch (err) {
            if(err.response && err.response.data) {
                console.log(err.response.data)
            } else {console.log(err)}
        }
    }

    return (
        <div>
            <img src={singleProduct.image_url}/>
            <button onClick={()=>addToCart(singleProduct.id)}>Add To Cart</button>
            <h1>{singleProduct.name}</h1>
            <h1>{singleProduct.price}</h1>
            <h2>{singleProduct.description}</h2>
            <h3>{singleProduct.quantity}</h3> 
        </div>
    )
}

export default SingleProduct