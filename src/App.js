import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import { useWeb3React } from '@web3-react/core';
import { injected } from './components/Connectors';
import Swal from 'sweetalert2';
import DetailPage from './pages/DetailPage';
import MintPage from './pages/MintPage';
import ProfilePage from './pages/ProfilePage';
import SellPage from './pages/SellPage';
import { login } from './api/api';

function App() {
  const { active, account, library, activate } = useWeb3React();
  const [isLoaded, setLoaded] = useState(false);
  const [conn, setConn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (active)
      setConn(true);
    else
      setConn(false);
  }, [active]);

  useEffect(() => {
    if (conn) {
      login(account).then(res => {
        console.log(res);
      });
    }
  }, [conn]);

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xa869' }], // chainId must be in hexadecimal numbers
        });
        await activate(injected);
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0xa869',
                  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
                },
              ],
            });
          } catch (addError) {
            console.log(addError)
          }
        }
      }
    } else {
      Swal.fire({
        title: 'Metamask',
        text: 'Please install metamask extension',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  if (!isLoaded)
    return (
      <Loading />
    );

  return (
    <div className='container-fluid p-0'>
      <Router>
        <Header isConnected={conn} account={account} onClick={connectMetamask} />
        <Routes>
          <Route path='/' exact element={<Navigate to='/marketplace' />} />
          <Route path='/marketplace' exact element={<MainPage account={account} />} />
          <Route path='*' element={<Navigate to='/' />} />
          <Route path='/detail'>
            <Route path=':id' element={<DetailPage library={library} account={account} />} />
          </Route>
          <Route path='/create' exact element={<MintPage library={library} account={account} />} />
          <Route path='/profile'>
            <Route path=':addr' element={<ProfilePage isConnected={conn} account={account} />} />
          </Route>
          <Route path='/sell'>
            <Route path=':id' element={<SellPage library={library} account={account} />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
