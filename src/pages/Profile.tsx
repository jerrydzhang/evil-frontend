import React, { useState } from 'react';
import Axios from 'axios';
import { useAuth0, IdToken } from "@auth0/auth0-react";

export function Profile() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const backendUrl = process.env.REACT_APP_BACKEND_URL!;

    const getCookie = async () => {
        const accessToken = await getAccessTokenSilently();
        Axios.post(`${backendUrl}/api/user/login`, {
            id: user!.sub,
            email: user!.email,
        }, 
        { headers: { Authorization: `Bearer ${accessToken}` }, withCredentials: true })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });            
    };

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            {(isAuthenticated) ? (
                <div>
                    <h1>Hello {user!.name}</h1>
                    <p>{user!.email}</p>
                    <p>{user!.nickname}</p>
                    <p>{user!.sub}</p>
                    <button onClick={getCookie}>Get Cookie</button>
                </div>
            ):(
                <div>
                    <h1>Hello, please log in</h1>
                </div>
            )}
        </div>
    );
}