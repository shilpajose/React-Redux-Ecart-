import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='bg-primary p-5 footer'>
            <div className='footer-content d-flex justify-content-between m-5'>
                <div className="media">
                    <h5 className='d-flex'>E-Cart</h5>
                    <p style={{ textAlign: 'justify' }}>Explore Products Online</p>
                    <span>Code licenced</span>
                    <span>Latest version</span>
                </div>
                <div className="links d-flex flex-column">
                    <h5>Links</h5>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'wheat' }}>Landing Page</Link>
                    <Link to={'/home'} style={{ textDecoration: 'none', color: 'wheat' }}>Home Page</Link>
                    <Link to={'/watch'} style={{ textDecoration: 'none', color: 'wheat' }} >Watch History</Link>

                </div>
                <div className="guides d-flex flex-column">
                    <h5>Guides</h5>
                    <a href="" target='_blank' style={{ textDecoration: 'none', color: 'wheat' }}>React Js</a>
                    <a href="" target='_blank' style={{ textDecoration: 'none', color: 'wheat' }}>React Bootstrap</a>
                    <a href="" target='_blank' style={{ textDecoration: 'none', color: 'wheat' }}>React Routing</a>
                </div>
                <div className="contact">
                    <h5>Contact Us</h5>
                    <div className='d-flex'>
                        <input type="text" className='form-control me-2' placeholder='Email Address' />
                        <button className='btn btn-danger pe-3 ps-3'><i class="fa-regular text-primary fa-circle-right"></i></button>
                    </div>
                    <div className="icons d-flex justify-content-between me-2 mt-3">
                        <a href="" style={{ textDecoration: 'none', color: 'wheat' }}><i class="fa-brands fa-square-instagram"></i></a>
                        <a href="" style={{ textDecoration: 'none', color: 'wheat' }}><i class="fa-brands fa-square-facebook"></i></a>
                        <a href="" style={{ textDecoration: 'none', color: 'wheat' }}><i class="fa-brands fa-square-twitter"></i></a>
                        <a href="" style={{ textDecoration: 'none', color: 'wheat' }}><i class="fa-brands fa-square-whatsapp"></i></a>
                        <a href="" style={{ textDecoration: 'none', color: 'wheat' }}><i class="fa-brands fa-github"></i></a>

                    </div>
                </div>
            </div>
            <p className='text-center' style={{color:'wheat'}}>Copy Right &copy; 2024.All rights Reserved.Built with reactJS</p>
        </div>
    )
}

export default Footer