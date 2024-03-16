import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart, incQuantity, removeCartItem } from '../REDUX/Slices/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  // remove cart item dispatch
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const cartItems = useSelector(state => state.cartReducer)

  // cart total price
  const [cartCount, setCartCount] = useState(0)
  useEffect(() => {
    if (cartItems?.length > 0) {
      setCartCount(cartItems?.map(item => item.totalPrice).reduce((t1, t2) => t1 + t2))
    } else {
      setCartCount(0)
    }
  }, [cartItems])  //cartitems eppozhoke update aavunno appol oke cartTotal update aavanam
  // Total price end

  // handle decrement,,,,if count is 1 then remove item..otherwise decrement 1
  const handleDecrementQuantity=(product)=>{
    if(product.quantity>1){
      dispatch(decQuantity(product.id))
    }else{
      dispatch(removeCartItem(product.id))
    }
  }

  // handleCheckout
  const handleCheckOut=()=>{
    dispatch(emptyCart())
    toast.success('Your Order has been placed.Thank You For Shopping with Us!!!')
    setTimeout(()=>{
      navigate('/')
    },2000)
  }

  return (
    <>
      <Header />
      <div style={{ marginTop: '150px' }} className='container'>

        {
          cartItems?.length > 0 ?
            <div className="p-5">
              <h1>Cart Summary</h1>
              <div className="row mt-5">
                <div className="col-lg-8">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>...</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cartItems?.map((product, index) => (
                          <tr>
                            <td>{product?.id}</td>
                            <td>{product?.title.slice(0, 11)}</td>
                            <td><img width={'60px'} height={'60px'} src={product?.thumbnail} alt="" /></td>
                            <td>
                              <div className='d-flex'>
                                <button onClick={()=>handleDecrementQuantity(product)} className="btn fw-bolder">-</button>
                                <input style={{ width: '70px' }} className='form-control' value={product?.quantity} type="text" name="" id="" placeholder='0' readOnly />
                                <button onClick={()=>dispatch(incQuantity(product.id))} className="btn fw-bolder">+</button>
                              </div>
                            </td>
                            <td>{product?.totalPrice}</td>
                            <td>
                              <button onClick={()=>dispatch(removeCartItem(product.id))} className="btn"><i className='fa-solid fa-trash text-danger'></i></button>
                            </td>
                          </tr>
                        ))
                      }

                    </tbody>
                  </table>
                  <div className="float-end mt-3">
                    <button onClick={()=>dispatch(emptyCart())} className="btn btn-danger rounded-pill">EMPTY CART</button>
                    <Link to={'/'} className='btn btn-primary ms-5 rounded-pill'>Shop More</Link>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className='shadow rounded ms-5 p-5'>
                    <h5>Total Items: <b className='text-info'>{cartItems?.length}</b></h5>
                    <h4>Total Amount: <b className='text-info'>${cartCount}</b></h4>
                    <div className='d-grid mt-4'>
                      <button onClick={handleCheckOut} className="btn btn-success rounded-pill">Check Out</button>
                    </div>
                  </div>
                </div>
              </div>
            </div> :
            <div style={{ height: '70vh' }} className='w-100 d-flex justify-content-center align-items-center flex-column'>
              <img className='img-fluid' src="https://i.postimg.cc/2yNm1fmS/empty-cart.gif" alt="" style={{ height: '300px' }} />
              <h1 className='mt-5 text-danger'>Your Cart is empty!!!</h1>
            </div>
        }
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Cart