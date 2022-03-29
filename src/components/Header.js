import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = props => {
    const navigate = useNavigate();
    const clickLogo = () => {
        navigate('/marketplace');
    }
    return (
        <header className='d-flex flex-row justify-content-between align-items-center p-3 border-bottom'>
            <div className='d-flex flex-row justify-content-start align-items-center' style={{ cursor: 'pointer' }} onClick={clickLogo}>
                <Logo />
                <h3 className='ms-2 mb-0 text-info'>NFT MARKET</h3>
            </div>
            <div className='d-flex flex-row justify-content-end align-items-center me-1 me-md-4'>
                {
                    props.isConnected ? <User address={props.account} /> : <ConnectButton onClick={props.onClick}/>
                }
            </div>
        </header>
    );
}

const ConnectButton = ({ onClick }) => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-success text-white border border-white rounded-pill py-2 px-3' onClick={onClick}>
            <p className='text-button-connect mb-0'>METAMASK</p>
        </div>
    );
};

const User = ({ address }) => {
    const navigate = useNavigate();

    const clickAddress = () => {    
        const url = '/profile/' + address;
        navigate(url);
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center border border-success rounded-pill p-2 px-4 button-address' onClick={clickAddress}>
            <p className='mb-0'>{showAddress(address)}</p>
        </div>
    );
};

const showAddress = addrStr => {
    const firstStr = addrStr.substr(0, 5);
    const secondStr = addrStr.substr(38, 4);
    return firstStr + "..." + secondStr;
}

export const Logo = () => (
    <div style={{ display: "flex" }}>
        <svg width="60" height="38" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0 10C0 4.47715 4.47715 0 10 0H20C25.5228 0 30 4.47715 30 10V20C30 25.5228 25.5228 30 20 30H10C4.47715 30 0 25.5228 0 20V10Z"
                fill="#E84142"
            />
            <path
                d="M20.2914 15.3898C20.8111 14.4921 21.6497 14.4921 22.1693 15.3898L25.4056 21.0709C25.9252 21.9685 25.5 22.7008 24.4607 22.7008H17.941C16.9134 22.7008 16.4882 21.9685 16.9961 21.0709L20.2914 15.3898ZM14.0315 4.45277C14.5512 3.55513 15.378 3.55513 15.8977 4.45277L16.6182 5.75198L18.3189 8.74017C18.7323 9.59056 18.7323 10.5945 18.3189 11.4449L12.6142 21.3307C12.0945 22.1339 11.2323 22.6417 10.2756 22.7008H5.53942C4.50005 22.7008 4.07485 21.9803 4.59454 21.0709L14.0315 4.45277Z"
                fill="white"
            />
        </svg>
    </div>
);

export default Header;
