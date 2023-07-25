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
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  const addToCart = async (id) => {
    try {
      let cartId = await axios.post("/api/orders/cartadd", {
        productId: id,
        sessionId: sessionId,
      }, {
        headers: {
          "Authorization": token
        }
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

      //this refreshes the quantity of the product in redux when we add to cart
      dispatch(fetchSingleProduct(id));
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
        <h1 className="product-name">{singleProduct.name}</h1>
        <h4>{singleProduct.category}</h4>
        <h2 className="product-description">{singleProduct.description}</h2>
        <h1 className="product-price">{singleProduct.price}</h1>
        {/* only show low quantity alert if q <5 */}
        {singleProduct.quantity <= 5 && singleProduct.quantity > 0 && (
          <h3 className="product-quantity">
            Only {singleProduct.quantity} left in stock - Order soon
          </h3>
        )}
        {/* if out of stock, show that */}
        {singleProduct.quantity <= 0 && (
          <h3 className="product-quantity">Out of stock - Check back soon</h3>
        )}
        {/* only show add-to-cart if in stock */}
        {singleProduct.quantity > 0 && (
          <button
            className="addcart-button"
            onClick={() => addToCart(singleProduct.id)}
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
