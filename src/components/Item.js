import React from 'react';
import LikeOutline from './assets/like_outline.png';
import LikeFilled from './assets/like_filled.png';
import AvaxLogo from './assets/avax.png';
import UsdtLogo from './assets/usdt.png';
import { useNavigate } from 'react-router-dom';

const NFTItem = props => {

    const navigate = useNavigate();

    const clickBuy = () => {
        const url = '/detail/' + 1;
        navigate(url);
    }

    return (
        <div className='col-sm-12 col-md-4 col-lg-3 px-3 px-xl-6 px-lg-2 px-sm-6 px-md-2 py-3'>
            <div className='border nft-item'>
                <img src='img/item.jpg' alt='NFT here' className='w-100 h-75' />
                <div className='d-flex flex-row justify-content-between p-2'>
                    <div className='d-flex flex-column justify-content-start align-items-start'>
                        <p className='mt-1 ms-2 item-text-title'>{'NFT #' + props.tokenId}</p>
                        <p className='ms-3 item-text-buy' onClick={clickBuy}>Buy Now</p>
                    </div>
                    <div className='d-flex flex-column justify-content-start align-items-end me-2'>
                        <p className='mb-0 text-secondary item-text-type'>Price</p>
                        <div className='d-flex flex-row justify-content-start align-items-center'>
                            <img src={AvaxLogo} alt='crypto' className='img-crypto' />
                            <p className='item-text-price mb-0 ms-2'>{props.price + ''}</p>
                        </div>
                        <div className='d-flex flex-row justify-content-start align-items-center mt-3'>
                            <img src={props.isLike ? LikeFilled : LikeOutline} alt='like' className='img-like' />
                            <p className='item-text-like mb-0 ms-2'>{props.likes + ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NFTItem;
