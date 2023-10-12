import React from 'react';
import Axios from 'axios';

export function Home() {
    const getIndex = () => {
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/index`, { withCredentials: true })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
            <h1>Home</h1>
            <p>PLACEHOLDER</p>
            <button onClick={getIndex}>Get Index</button>
        </div>
    );
}