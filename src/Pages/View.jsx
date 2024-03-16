import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistItem } from '../REDUX/Slices/wishlistSlice'
import { useParams } from 'react-router-dom'
import { addToCart } from '../REDUX/Slices/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function View() {

  // cart
  const cart =  useSelector(state=>state.cartReducer)

  // product single view 
  const [product, setProduct] = useState({})
  const { id } = useParams()
  // console.log(id);

  useEffect(() => {
    if (sessionStorage.getItem("allProducts")) {
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      // console.log(allProducts);
      setProduct(allProducts.find(item => item.id == id))
    }
  }, [])
  console.log(product);

  // wishlist message
  const wishlist = useSelector(state => state.wishlistReducer)

  // wishlist add data 
  const dispatch = useDispatch()


  // wishlist
  const handleWishlist = (product) => {
    if (wishlist?.includes(product)) {
      toast.info("Item already added to the wishlist")
    } else {
      dispatch(addWishlistItem(product))
      toast.success("Product Added to wishlist")
    }
  }

  // handle cart
  const handleCart =(product)=>{
    const existingProduct = cart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      toast.success("products added to your cart")
    }else{
      dispatch(addToCart(product))
      toast.success("product added to your cart")
    }
  }
  return (
    <>
      <Header />
      <div style={{ marginTop: '150px' }} className='container'>
        <Row>
          <Col>
            <img width={'500px'} height={'500px'} className='img-fluid mb-5' src={product?.thumbnail} alt="" />
          </Col>

          <Col>
            <h5>PID : {product?.id}</h5>
            <h1>{product?.title}</h1>
            <h3 className='text-danger fw-bolder'>$ {product?.price}</h3>
            <p style={{ textAlign: 'justify' }}> <b>Description</b> : {product?.description}</p>
            <div className="d-flex justify-content-between">
              <button onClick={() => handleWishlist(product)} className="btn btn-outline-dark"><i className='fa-solid fa-heart text-danger me-2'></i>Add To Wishlist</button>
              <button onClick={()=>handleCart(product)} className="btn btn-outline-dark"><i className='fa-solid fa-cart-plus me-2 '></i>Add To Cart</button>
            </div>
          </Col>
        </Row>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </>
  )
}

export default View