import React, { useEffect } from 'react';
import './profile.css'
import { useState, useRef } from "react";
import ProfileItem from '../components/ProfileItem';
import { useNavigate } from 'react-router-dom';

const ProfilePage = props => {

    const navigate = useNavigate();
    const [navIndex, setNavIndex] = useState(0)
    const navCollected = useRef();
    const navCreated = useRef();

    useEffect(() => {
        if (navIndex == 0) {
            navCollected.current.classList.add('active')
            navCreated.current.classList.remove('active')
        } else if (navIndex == 1) {
            navCollected.current.classList.remove('active')
            navCreated.current.classList.add('active')
        }
        return true
    }, ([navIndex]));

    const clickCreate = () => {
        navigate('/create');
    }

    return (
        <section className="profile-container">
            <nav className='d-flex'>
                <div className='nav-btn nav-btn-one active' ref={navCollected} onClick={() => setNavIndex(0)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-diff me-2" viewBox="0 0 16 16">
                        <path d="M8 5a.5.5 0 0 1 .5.5V7H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V8H6a.5.5 0 0 1 0-1h1.5V5.5A.5.5 0 0 1 8 5zm-2.5 6.5A.5.5 0 0 1 6 11h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                    </svg>
                    <span>Collected</span>
                </div>
                <div className='nav-btn nav-btn-two' ref={navCreated} onClick={() => setNavIndex(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-heart me-2" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                    </svg>
                    <span>Created</span>
                </div>
                <button type="button" className="btn btn-secondary ms-auto me-4 btn-create" onClick={clickCreate}>
                    Create
                </button>
            </nav>
            {navIndex == 0 ?
                <div className='container mt-4'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-6 col-lg-4 my-2'>
                            <ProfileItem type={'collected'} collectionName={'collectionName'} itemName={'itemName'} imgUrl='https://lh3.googleusercontent.com/YX0It7W6UBZD0NTDHgGFew9k7ZMQrX77XPXOsbAGqUDwMMc7vL1OI-NLr5zPFnWSLFJ7XnF4fQbfTzcNiHCWNeI4JEwOW6H6sVF3RYg=w600' />
                        </div>
                        <div className='col-xs-12 col-sm-6 col-lg-4 my-2'>
                            <ProfileItem type={'collected'} collectionName={'collectionName'} itemName={'itemName'} imgUrl='https://lh3.googleusercontent.com/YX0It7W6UBZD0NTDHgGFew9k7ZMQrX77XPXOsbAGqUDwMMc7vL1OI-NLr5zPFnWSLFJ7XnF4fQbfTzcNiHCWNeI4JEwOW6H6sVF3RYg=w600' />
                        </div>
                        <div className='col-xs-12 col-sm-6 col-lg-4 my-2'>
                            <ProfileItem type={'collected'} collectionName={'collectionName'} itemName={'itemName'} imgUrl='https://lh3.googleusercontent.com/YX0It7W6UBZD0NTDHgGFew9k7ZMQrX77XPXOsbAGqUDwMMc7vL1OI-NLr5zPFnWSLFJ7XnF4fQbfTzcNiHCWNeI4JEwOW6H6sVF3RYg=w600' />
                        </div>
                        <div className='col-xs-12 col-sm-6 col-lg-4 my-2'>
                            <ProfileItem type={'collected'} collectionName={'collectionName'} itemName={'itemName'} imgUrl='https://lh3.googleusercontent.com/YX0It7W6UBZD0NTDHgGFew9k7ZMQrX77XPXOsbAGqUDwMMc7vL1OI-NLr5zPFnWSLFJ7XnF4fQbfTzcNiHCWNeI4JEwOW6H6sVF3RYg=w600' />
                        </div>
                        <div className='col-xs-12 col-sm-6 col-lg-4 my-2'>
                            <ProfileItem type={'collected'} collectionName={'collectionName'} itemName={'itemName'} imgUrl='https://lh3.googleusercontent.com/YX0It7W6UBZD0NTDHgGFew9k7ZMQrX77XPXOsbAGqUDwMMc7vL1OI-NLr5zPFnWSLFJ7XnF4fQbfTzcNiHCWNeI4JEwOW6H6sVF3RYg=w600' />
                        </div>
                        <div className='col-xs-12 col-sm-6 col-lg-4 my-2'>
                            <ProfileItem type={'collected'} collectionName={'collectionName'} itemName={'itemName'} imgUrl='https://lh3.googleusercontent.com/YX0It7W6UBZD0NTDHgGFew9k7ZMQrX77XPXOsbAGqUDwMMc7vL1OI-NLr5zPFnWSLFJ7XnF4fQbfTzcNiHCWNeI4JEwOW6H6sVF3RYg=w600' />
                        </div>
                    </div>
                </div> :
                <div className='container mt-4'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-6 col-lg-4 my-2 item-container'>
                            <ProfileItem type={'created'} collectionName={'collectionName'} itemName={'itemName'} imgUrl='https://lh3.googleusercontent.com/NlNzdG3snmQ-14cX1sfJbsExFzphdihBh4Xz94yEBX4jhVjwIR18Y4oRfBB-jH5IqjOfbI9iwF0xPWEpSB5gWzT4_eTlgGSt3cMxpA=w600' />
                        </div>
                        <div className='col-xs-12 col-sm-6 col-lg-4 my-2'>
                            <ProfileItem type={'created'} collectionName={'collectionName'} itemName={'itemName'} imgUrl='https://lh3.googleusercontent.com/NlNzdG3snmQ-14cX1sfJbsExFzphdihBh4Xz94yEBX4jhVjwIR18Y4oRfBB-jH5IqjOfbI9iwF0xPWEpSB5gWzT4_eTlgGSt3cMxpA=w600' />
                        </div>
                        <div className='col-xs-12 col-sm-6 col-lg-4 my-2'>
                            <ProfileItem type={'created'} collectionName={'collectionName'} itemName={'itemName'} imgUrl='https://lh3.googleusercontent.com/NlNzdG3snmQ-14cX1sfJbsExFzphdihBh4Xz94yEBX4jhVjwIR18Y4oRfBB-jH5IqjOfbI9iwF0xPWEpSB5gWzT4_eTlgGSt3cMxpA=w600' />
                        </div>
                        <div className='col-xs-12 col-sm-6 col-lg-4 my-2'>
                            <ProfileItem type={'created'} collectionName={'collectionName'} itemName={'itemName'} imgUrl='https://lh3.googleusercontent.com/NlNzdG3snmQ-14cX1sfJbsExFzphdihBh4Xz94yEBX4jhVjwIR18Y4oRfBB-jH5IqjOfbI9iwF0xPWEpSB5gWzT4_eTlgGSt3cMxpA=w600' />
                        </div>
                        <div className='col-xs-12 col-sm-6 col-lg-4 my-2'>
                            <ProfileItem type={'created'} collectionName={'collectionName'} itemName={'itemName'} imgUrl='https://lh3.googleusercontent.com/NlNzdG3snmQ-14cX1sfJbsExFzphdihBh4Xz94yEBX4jhVjwIR18Y4oRfBB-jH5IqjOfbI9iwF0xPWEpSB5gWzT4_eTlgGSt3cMxpA=w600' />
                        </div>
                        <div className='col-xs-12 col-sm-6 col-lg-4 my-2'>
                            <ProfileItem type={'created'} collectionName={'collectionName'} itemName={'itemName'} imgUrl='https://lh3.googleusercontent.com/NlNzdG3snmQ-14cX1sfJbsExFzphdihBh4Xz94yEBX4jhVjwIR18Y4oRfBB-jH5IqjOfbI9iwF0xPWEpSB5gWzT4_eTlgGSt3cMxpA=w600' />
                        </div>
                    </div>
                </div>
            }

        </section>
    );
}


export default ProfilePage;
