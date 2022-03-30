import React, { useEffect, useState } from 'react';
import NFTItem from '../components/Item';
import { getAllOrders, getTokenData } from '../api/api';

const MainPage = props => {

    const [orderData, setOrderData] = useState([]);
    const [tokenData, setTokenData] = useState([]);

    useEffect(() => {
        getAllOrders().then(res => {
            setOrderData(res);
            const tokenIds = [];
            res.forEach(order => {
                tokenIds.push(order.tokenId);
            });
            getTokenData(tokenIds).then(result => {
                setTokenData(result);
            });
        })
    }, []);

    return (
        <div className='row m-auto px-lg-5 px-md-1 px-sm-2 main-container'>
            {
                tokenData.map((item, index) => {
                    return (
                        <div className='col-sm-12 col-md-4 col-lg-3 px-3 px-xl-6 px-lg-2 px-sm-6 px-md-2 py-3' key={index}>
                            <NFTItem data={item} price={orderData[index].price} account={props.account} orderId={orderData[index].id} />
                        </div>   
                    );
                })
            }
      </div>
    );
}

export default MainPage;
