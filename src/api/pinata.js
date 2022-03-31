import Axios from 'axios';
import FormData from 'form-data';

const url_file = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const url_json = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'
const API_KEY = 'ff8919b9155bf172cde0';
const API_SECRET = '6420cae88534cb7c4f6dbc0d4089c21b0978bcfa2444c5cb10cce004e0d65fd0';

export async function uploadImageToPinata(data) {
    const formData = new FormData();
    formData.append('file', data);
    const result = await Axios.post(url_file, formData, {
        maxContentLength: 'Infinity',
        headers: {
            'Content-Type': `multipart/form-data;boundary=${formData._boundary}`,
            'pinata_api_key': API_KEY,
            'pinata_secret_api_key': API_SECRET
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

export async function uploadMetaDataToPinata(data) {
    const result = await Axios.post(url_json, data, {
        headers: {
            'pinata_api_key': API_KEY,
            'pinata_secret_api_key': API_SECRET
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
