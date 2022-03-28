import Axios from 'axios';

Axios.defaults.baseURL = 'http://localhost:5000/';

export async function getUserData(addr) {
    const result = await Axios.get('/users/current', {
        params: {
            address: addr
        }
    }).then(
        async function(response) {
            return response.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function login(addr) {
    const result = await Axios.post('/users/login', {
        address: addr
    }).then(
        async function(response) {
            return response.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function getTokenData(tokenIds) {
    const result = await Axios.get('/nfts/tokens', {
        params: {
            tokenIds: tokenIds
        }
    }).then(
        async function(response) {
            return response.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}
