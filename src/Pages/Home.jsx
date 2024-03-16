import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import Header from '../Components/Header'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../REDUX/Slices/prod_Slice';


function Home() {
  
  
  // call fetch proucts
  const dispatch = useDispatch()

  // use/access data from store
  const { allProducts, error, loading } = useSelector(state => state.productReducer)
  console.log(allProducts, error, loading);

  // pagination allproducts access after initialization
  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerpage = 8
  const totalPages = Math.ceil(allProducts?.length / productsPerpage)
  const lastProductIndex = currentPage * productsPerpage
  const firstProductIndex = lastProductIndex - productsPerpage
  const visibleCards = allProducts?.slice(firstProductIndex, lastProductIndex)


  // // call
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  // pagination
  const navigateToNextPage = () => {
    if (currentPage != totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  const navigateToPrevPage = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <>
      <Header insideHome></Header>
      <div className='container' style={{ marginTop: '100px' }}>
        {loading ? <div className='mt-5 text-center fw-bolder'>
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
        </div> :
          <Row>
            {allProducts?.length > 0 ? visibleCards?.map(product => (<Col className='mb-5' sm={12} md={4} lg={6} xl={3}>
              <Card className='shadow rounded' style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product?.thumbnail} style={{ height: '180px' }} />
                <Card.Body>
                  <Card.Title>{product?.title.slice(0, 15)}</Card.Title>
                  <div className='text-center'>
                    <Link to={`/view/${product?.id}`} variant="primary">View More...</Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>)) :
              <div>Nothing to display</div>
            }
          </Row>}

        <div className='d-flex justify-content-center align-items-center mt-5 mb-5'>
          <span onClick={navigateToPrevPage} style={{cursor:'pointer'}}><i className='fa-solid fa-backward me-2 text-danger'></i></span>
          <span className='fw-bolder text-success'>{currentPage} of {totalPages}</span>
          <span onClick={navigateToNextPage} style={{cursor:'pointer'}}><i className='fa-solid fa-forward ms-2 text-danger'></i></span>
        </div>
      </div>
    </>
  )
}

export default Home


