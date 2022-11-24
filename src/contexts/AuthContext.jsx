import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { setCookie, parseCookies } from 'nookies'
import Router from "next/router";

export const AuthContext = createContext({})

export function AuthProvider({children}) {
    const [userNow, setUserNow] = useState({})
    const [userAuth, setUserAuth] = useState({})
   
    const isAuthenticated = !!userNow

    function SetDarkMode(props) {
        setCookie(undefined, 'color-mode', props, {
            maxAge: 60 * 60 * 1 //1 hour
        })
    }

    useEffect(() => {
        async function nameUser() {
            const { 'dashboard.token': token } = parseCookies()

            if(token){
                const {data: {user}} = await api.post('user', { token })
                setUserAuth(user)         
            }
        }

        nameUser()
    }, [])

    async function signIn({ username, password }) {
        const { data: {user} } = await api.post('login', { username, password })

        setCookie(undefined, 'dashboard.token', user._id, {
            maxAge: 60 * 60 * 1 //1 hour
        })

        setUserNow(user)
        setUserAuth(user)
        Router.push('/dashboard')
    }

    async function signUp({ username, password, email }) {
        try{
            const { data: {user} } = await api.post('users', { username, password, email })

            setCookie(undefined, 'dashboard.token', user._id, {
                maxAge: 60 * 60 * 1 //1 hour
            })
    
            setUserNow(user)
            setUserAuth(user)
            Router.push('/dashboard')
        }catch(err){
            return alert('usuario ou email já cadastrado')
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            signIn,
            userNow,
            userAuth,
            SetDarkMode,
            signUp
        }}>
            { children }
        </AuthContext.Provider>
    )
}