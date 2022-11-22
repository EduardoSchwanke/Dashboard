import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { setCookie, parseCookies } from 'nookies'
import Router from "next/router";

export const AuthContext = createContext({})

export function AuthProvider({children}) {
    const [userNow, setUserNow] = useState(null)
    const [userAuth, setUserAuth] = useState({})

    const isAuthenticated = !!userNow

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
        Router.push('/dashboard')
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            signIn,
            userNow,
            userAuth
        }}>
            { children }
        </AuthContext.Provider>
    )
}