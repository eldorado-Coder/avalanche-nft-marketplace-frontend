import React, { useEffect, useState } from 'react';
import './mint.css'
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import { Contract } from '@ethersproject/contracts';
import NftABI from '../abi/nft.abi.json';
import { uploadImageToPinata, uploadMetaDataToPinata } from '../api/pinata';
import { createNft } from '../api/api';
import Loading from '../components/Loading';

const thumb = {
    display: 'inline-flex',
    borderRadius: 10,
    border: '1px solid #eaeaea',
    width: "100%",
    height: "100%",
    padding: 4,
    boxSizing: 'border-box',
    position: "absolute",
};

const img = {
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: 10
};

const MintPage = props => {

    const [files, setFiles] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [imgUrl, setImgUrl] = useState('');
    const [minting, setMinting] = useState(false);
    const [uploading, setUploading] = useState(true);
    const [onDrop, setOnDrop] = useState(false);

    const contractAddress = "0xdC16363e321fa962A85D5455c71572F35d7aB576";

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setOnDrop(true);
            setFiles(acceptedFiles.map(file => {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                });
            }));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <img src={file.preview} alt='alt' style={img} />
        </div>
    ));

    useEffect(() => {
        files.forEach(file => {
            try {
                (async () => {
                    const res = await uploadImageToPinata(file);
                    const url = 'https://gateway.pinata.cloud/ipfs/' + res.IpfsHash;
                    setImgUrl(url);
                })();
            } catch (err) {
                console.log('Error uploading files: ', err);
                Swal.fire({
                    title: 'Uploading to IPFS',
                    text: 'There is an error in uploading to IPFS',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }, [files]);

    const clickCreate = () => {
        if (name == '' || description == '' || imgUrl == '') {
            Swal.fire({
                title: 'Warning',
                text: 'Fill in the required fields(Name, Description, Image)',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (amount < 1) {
            Swal.fire({
                title: 'Warning',
                text: 'Amount is invalid',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (props.library) {
            setMinting(true)
            const contract = new Contract(contractAddress, NftABI, props.library).connect(props.library.getSigner(props.account));
            const meta_data = {
                name,
                description,
                image: imgUrl
            };
            uploadMetaDataToPinata(meta_data).then(res => {
                setUploading(false);
                const url = 'https://gateway.pinata.cloud/ipfs/' + res.IpfsHash;
                if (amount < 2) {
                    contract.mint(url).then(res => {
                        res.wait().then(result => {
                            const tokenId = result.events[0].args[2].toNumber();
                            createNft(tokenId, url, props.account).then(res => {
                                if (res != null) {
                                    Swal.fire({
                                        title: 'Minting Report',
                                        text: 'A new NFT is minted successfully',
                                        icon: 'success',
                                        confirmButtonText: 'OK'
                                    });
                                    setImgUrl("");
                                    setFiles([]);
                                    setName('');
                                    setDescription('');
                                    setAmount(1);
                                }
                            });
                            setMinting(false);
                            setOnDrop(false);
                        }).catch(err => {
                            console.log(err)
                            setMinting(false);
                        });
                    }).catch(err => {
                        console.log(err)
                        setMinting(false);
                    });
                } else {
                    const uris = [];
                    for (let i = 0; i < amount; i++)
                        uris.push(url);
                    contract.mintBatch(uris).then(res => {
                        res.wait().then(result => {
                            const txResults = [];
                            result.events.forEach(event => {
                                const tokenId = event.args[2].toNumber();
                                const txRes = createNft(tokenId, url, props.account);
                                txResults.push(txRes);
                            });
                            Promise.all(txResults).then(() => {
                                Swal.fire({
                                    title: 'Minting Report',
                                    text: 'New NFTs are minted successfully',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                });
                                setFiles([]);
                                setName('');
                                setDescription('');
                                setAmount(1);
                            });
                            setMinting(false);
                            setOnDrop(false);
                        }).catch(err => {
                            console.log(err)
                            setMinting(false);
                        });
                    }).catch(err => {
                        console.log(err)
                        setMinting(false);
                    });
                }
            }).catch(err => console.log(err));
        }
    }

    return (
        <React.Fragment>
            {!minting && <section className="container create-container pb-2 ma">
                <h1>Create New Item</h1>
                <div className='row d-flex align-items-center'>
                    <div className='col-md-12 col-lg-6'>
                        <h4>Image</h4>
                        <div {...getRootProps({ className: 'dropzone' })} >
                            <input {...getInputProps()} />
                            <span>File types supported: JPG, PNG Max size: 100 MB</span>
                            <div className='dropzone-placeholder'>
                                <div className={'dropzone-placeholder-mask'}>
                                    {thumbs}
                                    {!onDrop && <svg xmlns="http://www.w3.org/2000/svg" opacity={0.15} width={84} height={84} fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                                    </svg>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-12 col-lg-6'>
                        <label htmlFor='amount form-label font-weight-bold'>Amount</label>
                        <input type='number' name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} className='amount-input mt-2'></input>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                    <input className="form-control" id="exampleFormControlInput1" placeholder="Item name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea disabled={minting} onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" placeholder='Provide a detail description of your item.' id="exampleFormControlTextarea1" rows="3" required></textarea>
                </div>
                <div className='mt-3'>
                    <button type="button" disabled={minting && uploading} className="btn btn-secondary" onClick={clickCreate}>Create</button>
                </div>
            </section>}
            {minting && <div
                style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Loading />
            </div>}
        </React.Fragment>
    );
}

export default MintPage;
