import React from 'react'
import Header from '../Components/Header'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../REDUX/Slices/wishlistSlice'
import { addToCart } from '../REDUX/Slices/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Wishlist() {

  const wishlist = useSelector(state => state.wishlistReducer)
  // handle cart
  const cart = useSelector(state => state.cartReducer)
  const dispatch = useDispatch()

  // handle cart
  const handleCart = (product) => {
    const existingProduct = cart?.find(item => item.id == product.id)
    if (existingProduct) {
      dispatch(addToCart(product))
      alert('1')
      dispatch(removeWishlistItem(product.id))
      alert('2')
      toast.success("products added to your cart")
    } else {
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
      toast.success("product added to your cart")
    }
  }
  return (
    <>
      <Header />
      <div style={{ marginTop: '150px' }} className='container'>
        {/* for empty cart  */}
        {
          wishlist?.length > 0 ?
            <Row>
              {wishlist?.map(product => (
                <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
                  <Card className='shadow rounded' style={{ width: '18rem' }}>
                    <Card.Img style={{ height: '180px' }} variant="top" src={product?.thumbnail} />
                    <Card.Body>
                      <Card.Title>{product?.title.slice(0, 11)}</Card.Title>
                      <div className="d-flex justify-content-between">
                        <button onClick={() => dispatch(removeWishlistItem(product?.id))} className="btn"><i className='fa-solid fa-heart-circle-xmark text-danger'></i></button>
                        <button onClick={() => (handleCart(product))} className="btn"><i className='fa-solid fa-cart-plus text-success'></i></button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
              }
            </Row> : <div style={{ height: '70vh' }} className='w-100 d-flex justify-content-center align-items-center flex-column'>
              <img className='img-fluid' src="https://i.postimg.cc/mD5jjbhT/empty-wishlist-removebg-preview.png" alt="" />
            </div>
        }

        {/* for listing items  */}

      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Wishlist