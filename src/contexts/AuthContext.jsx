import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { setCookie, parseCookies } from 'nookies'
import Router from "next/router";

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
    const [userAuth, setUserAuth] = useState({})
    const [errorLogin, setErrorLogin] = useState(false)
    const [errorSignup, setErrorSignup] = useState(false)
   
    const isAuthenticated = !!userAuth

    useEffect(() => {
        async function nameUser() {
            const { 'dashboard_token': token } = parseCookies()

            if(token){
                const {data: {user}} = await api.post('user', { token })
                setUserAuth(user)         
            }
        }

        nameUser()
    }, [])


    async function signIn({ username, password }) {
        try{
            const { data: {user} } = await api.post('login', { username, password })

            setCookie(undefined, 'dashboard_token', user._id, {
                maxAge: 60 * 60 * 60 // 24 hours
            })

            setCookie(undefined, 'component_render', 'create', {
                maxAge: 60 * 60 * 60 // 24 hours
            })

            setErrorLogin(false)
            setUserAuth(user)
            Router.push('/dashboard')
        }catch(err){
            setErrorLogin(true)
        }
    }

    async function signUp({ username, password, email }) {
        try{
            const { data: {user} } = await api.post('users', { username, password, email })

            setCookie(undefined, 'dashboard_token', user._id, {
                maxAge: 60 * 60 * 24 // 24 hours
            })
    
            setErrorSignup(false)
            setUserAuth(user)
            Router.push('/dashboard')
        }catch(err){
            setErrorSignup(true)
        }
    }

    async function sendMail({ email }) {
        try{
            await api.post('forgot_password', { email })

            alert('check seu email')
        }catch(err){
            alert('error')
        }
    }


    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            signIn,
            userAuth,
            signUp,
            errorLogin,
            setErrorLogin,
            errorSignup,
            setErrorSignup,
            sendMail,
        }}>
            { children }
        </AuthContext.Provider>
    )
}
