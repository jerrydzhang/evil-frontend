import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export function Profile() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = useState<string | undefined>();

    if (isAuthenticated) {
        getAccessTokenSilently().then((token) => {
            setAccessToken(token);
        });
    }

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
                    <p>{accessToken}</p>
                </div>
            ):(
                <div>
                    <h1>Hello, please log in</h1>
                </div>
            )}
        </div>
    );
}