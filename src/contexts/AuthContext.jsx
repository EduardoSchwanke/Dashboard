import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { setCookie, parseCookies } from 'nookies'
import Router from "next/router";

export const AuthContext = createContext({})

export function AuthProvider({children}) {
    const [name, setUser] = useState(null)

    const isAuthenticated = !!name

    useEffect(() => {
        async function nameUser() {
            const { 'dashboard.token': token } = parseCookies()

            if(token){
                const {data: {user}} = await api.post('user', { token })
                setUser(user.username)           
            }
        }

        nameUser()
    }, [])

    async function signIn({ username, password }) {
        const { data: {user} } = await api.post('login', { username, password })

        setCookie(undefined, 'dashboard.token', user._id, {
            maxAge: 60 * 60 * 1 //1 hour
        })

        setUser(user.username)
        Router.push('/dashboard')
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            signIn,
            name
        }}>
            { children }
        </AuthContext.Provider>
    )
}