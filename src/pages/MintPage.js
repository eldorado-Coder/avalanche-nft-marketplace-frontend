import React, { useEffect, useState } from 'react';
import './mint.css'
import { useDropzone } from 'react-dropzone';
import { create } from 'ipfs-http-client';
import Swal from 'sweetalert2';

const client = create('https://ipfs.infura.io:5001/api/v0');

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};
const MintPage = props => {

    const [files, setFiles] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [metaUrl, setMetaUrl] = useState('');

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            }));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} alt='alt' style={img} />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        //files.forEach(file => URL.revokeObjectURL(file.preview));
        files.forEach(file => {
            try {
                (async() => {
                    
                })();
            } catch(err) {
                console.log('Error uploading files: ', err);
            }
        });
    }, [files]);

    const clickCreate = () => {
        if(name == '' || description == '' || metaUrl == '') {
            Swal.fire({
                title: 'Warning',
                text: 'Fill in the required fields(Name, Description, Image)',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    return (
        <section className="container create-container pb-2">
            <h1>Create New Item</h1>
            <div>
                <h4>Image, Audio or Video</h4>
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <span>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</span>
                    <div className='dropzone-placeholder'>
                        <div className='dropzone-placeholder-mask'>
                            <svg xmlns="http://www.w3.org/2000/svg" opacity={0.15} width={84} height={84} fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                            </svg>
                        </div>

                    </div>
                </div>
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                <input className="form-control" id="exampleFormControlInput1" placeholder="Item name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" placeholder='Provide a detail description of your item.' id="exampleFormControlTextarea1" rows="3" required></textarea>
            </div>
            <div className='mt-3'>
                <button type="button" className="btn btn-secondary" onClick={clickCreate}>Create</button>
            </div>
        </section>
    );
}


export default MintPage;
