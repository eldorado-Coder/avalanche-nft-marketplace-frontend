import React, { useEffect } from 'react';
import './sell.css'
import { useState, useRef } from "react";
import ProfileItem from '../components/ProfileItem';

const AVAX_ICON = '/img/avax.png'
const SellPage = props => {

    const [price, setPrice] = useState(0)

    return (
        <div className='container sell-container'>
            <div className='row'>
                <div className='col-md-12 col-lg-6 mt-4 d-flex flex-column justify-content-center min-height-90vh'>
                    <h3>List item for sale</h3>
                    <form>
                        <div className="form-group mt-4">
                            <span className='price-text mb-2'>Price</span>
                            <div className='d-flex mb-4'>
                                <div className='eth-select d-flex align-items-center'>
                                    <img src={AVAX_ICON} width={24} height={24} className="mx-2" />
                                    <span>AVAX</span>
                                    <div className='arrow-down ms-auto me-2' />
                                </div>
                                <div className='amount-input ms-2 w-100'>
                                    <input placeholder='Amount' value={price} type="number" onChange={(e) => setPrice(e.target.value)} required/>
                                </div>
                            </div>
                            <span className='price-text mb-2'>Fees</span>
                            <div className='service-fee d-flex justify-content-between mb-4'>
                                <span>Service Fee</span>
                                <span>2.5%</span>
                            </div>
                            <button className='btn-listing mt-4'>
                                Complete Listing
                            </button>
                        </div>
                    </form>
                </div>
                <div className='col-md-12 col-lg-6 flex-column min-height-90vh d-flex justify-content-center align-items-center'>
                    <span className='price-text my-4'>Preview</span>
                    <ProfileItem className='preview-item' price={price} collectionName={'collectionName'} itemName={'itemName'} type={'preview'} imgUrl={'https://lh3.googleusercontent.com/YX0It7W6UBZD0NTDHgGFew9k7ZMQrX77XPXOsbAGqUDwMMc7vL1OI-NLr5zPFnWSLFJ7XnF4fQbfTzcNiHCWNeI4JEwOW6H6sVF3RYg=w600'} />
                </div>
            </div>
        </div>
    );
}


export default SellPage;
