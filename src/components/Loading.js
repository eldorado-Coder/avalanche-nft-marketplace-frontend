import React from 'react';
import Lottie from 'lottie-react';
import loadingJson from "./assets/nft_loading.json";

const Loading = () => {

    const style = {
        height: 300,
        width: 300
    };

    return (
        <div className='vw-100 vh-100 d-flex flex-column justify-content-center align-items-center'>
            <Lottie animationData={loadingJson} loop={true} height={400} width={400} style={style} autoplay={true} />
        </div>
    );
}

export default Loading;
