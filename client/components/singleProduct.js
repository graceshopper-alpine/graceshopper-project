import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProductSlice";

const SingleProduct = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const singleProduct = useSelector((state) => {
        return state.singleProduct.singleProduct
    })

    useEffect(() => {
        dispatch(fetchSingleProduct(id))
    }, [dispatch, id])

    return (
        <div>
            Hello world
            <img src={singleProduct.image_url}/>
            <h1>${singleProduct.price}</h1>
            <h2>{singleProduct.description}</h2>
            <h3>{singleProduct.quantity}</h3> 
        </div>
    )
}

export default SingleProduct