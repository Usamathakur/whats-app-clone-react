import React, { useState } from 'react';
import {Button} from "@material-ui/core"
import './Login.css';
import {auth, provider} from './firebase';
import { useStateValue } from "./StateProvider";
import {actionTypes} from "./reducer";

function Login(){
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        }).catch((error) => alert(error.message));
    };
    return(
        <div className="login">
            <div className="login__container">
                <img src="http://pngimg.com/uploads/whatsapp/whatsapp_PNG16.png"></img>
                <div className="login__text">
                    <h1>Sign in to What's App</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign In with Google
                </Button>
            </div>
        </div>
    )
}

export default Login