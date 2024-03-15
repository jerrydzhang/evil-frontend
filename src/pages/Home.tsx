import React, { useEffect } from 'react';
import Axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';
import { Header } from '../Header';
import { ThreeDComponent } from '../3dcomponents/3dComponent';

export function Home() {
    const { getAccessTokenSilently } = useAuth0();
    const location = useLocation();
    const isPresent = useIsPresent();

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

    // useEffect(() => {
    //     console.log(`mounted ${isPresent}`);
    //     return () => {
    //         console.log(`unmounted ${isPresent}`);
    //     }
    // });

    return (
        <div>
            <h1>Home</h1>
            <p>PLACEHOLDER</p>
            <button onClick={getIndex}>Get Index</button>
            <button onClick={getToken}>Get Token</button>
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0, transition: { duration: 0.5, ease: "circOut" } }}
                exit={{ opacity: 1, transition: { duration: 0.5, ease: "circIn" } }}
                className="privacy-screen"
            />
        </div>
    );
}