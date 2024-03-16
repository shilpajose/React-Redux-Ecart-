import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchProduct } from '../REDUX/Slices/prod_Slice';


function Header({insideHome}) {

    // search 
    const dispatch = useDispatch()

    // wishlist Count 
    const wishlistCount = useSelector(state => state.wishlistReducer).length
    // cart count
    const cartCount = useSelector(state=>state.cartReducer).length
    return (
        <>
            <Navbar className="bg-primary position-fixed top-0 w-100" style={{ zIndex: '10' }}>
                <Container>
                    <Navbar.Brand href="#home">
                        {' '}
                        <i class="fa-solid fa-truck-fast text-white me-2"></i>
                       <Link to={'/'}>
                            <span>
                                E-Cart
    
                            </span>
                       </Link>          </Navbar.Brand>
                    { insideHome &&
                        <Form inline>
                        <Row>
                            <Col xs="auto">
                                <Form.Control onChange={(e)=>dispatch(searchProduct(e.target.value.toLowerCase()))}
                                    type="text"
                                    placeholder="Search Products..."
                                    className="form-control mr-sm-2"
                                />
                            </Col>
                            <Col xs="auto">
                                <Button type="submit" className='btn btn-outline-light rounded-pill'>Submit</Button>
                            </Col>
                        </Row>
                    </Form>}
                    <Link to={'/wishlist'}>
                        <span><i className="fa-solid fa-heart text-danger me-1"></i>WishList <sup><Badge className='border rounded-pill' bg="light">{wishlistCount}</Badge></sup></span>
                    </Link>
                    <Link to={'/cart'}>
                        <span><i className="fa-solid fa-cart-shopping text-light me-1"></i>Cart <sup><Badge className='border rounded-pill' bg="light">{cartCount}</Badge></sup></span>
                    </Link>
                </Container>
            </Navbar>
        </>
    )
}

export default Header