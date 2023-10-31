import React from 'react';
import Axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export function Home() {
    const { getAccessTokenSilently } = useAuth0();

    const getIndex = () => {
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/index`, { withCredentials: true })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const getToken = () => {
        getAccessTokenSilently().then((accessToken) => {
            console.log(accessToken);
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
            <button onClick={getToken}>Get Token</button>
        </div>
    );
}