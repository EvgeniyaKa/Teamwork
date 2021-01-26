import React from 'react'
import {Login} from '../components/Auth/Login'
import {Register} from '../components/Auth/Register'

export const AuthPage = ({ action }) => {

    return (
        <>
        {
            (action === 'login') &&
            <Login />

        }
        {
            (action === 'register') &&
            <Register />
        }
        </>
    )
}