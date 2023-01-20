
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [file, changeFile] = useState(null);
    const [modelName, changeModelName] = useState('');
    const getTag = () => {
        if (modelName.length > 0)
            return false;
        else
            return true;
    }
    const download = () => {

        fetch('http://localhost:5000/download').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;

                alink.download = 'model.pkl';
                alink.click();
            })
        })

    }
    const handleSubmit = async (event) => {

        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        const isRunning = async () => {
            const { data } = await axios.post('http://localhost:5000/inputs', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            return data;
        }
        const mName = await isRunning();
        changeModelName(mName);
        console.log(mName);
    }

    return (
        <div className="lg-main">
            <div>
                <h1>App</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>File Name: </label>
                    <input type='file' onChange={(event) => changeFile(event.target.files[0])} />
                    <p>
                        {modelName}
                    </p>
                    <button type='submit'>Submit</button>

                    <button hidden={getTag()}
                        onClick={() => download()}>

                        Download

                    </button>
                </form>
            </div>
        </div>
    )
};

export default Login;