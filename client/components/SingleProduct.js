import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProductSlice";
import axios from "axios";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleProduct = useSelector((state) => {
    return state.singleProductSlice.singleProduct;
  });

  const sessionId = useSelector((state) => state.main.sessionId);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  const addToCart = async (id) => {
    try {
      let cartId = await axios.post("/api/orders/cartadd", {
        productId: id,
        sessionId: sessionId,
      });

      cartId = cartId.data.cartId;
      dispatch({
        type: "main/setCartId",
        payload: cartId,
      });

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
  };

  return (
    <div className="single-product-container">
      <div className="single-product-image">
        <img src={singleProduct.image_url} />
      </div>
      <div className="single-product-details">
        <button
          className="addcart-button"
          onClick={() => addToCart(singleProduct.id)}
        >
          Add To Cart
        </button>
        <h1 className="product-name">{singleProduct.name}</h1>
        <h1 className="product-price">{singleProduct.price}</h1>
        <h2 className="product-description">{singleProduct.description}</h2>
        <h3 className="product-quantity">
          "Only {singleProduct.quantity} left in stock - Order soon"
        </h3>
      </div>
    </div>
  );
};

export default SingleProduct;
