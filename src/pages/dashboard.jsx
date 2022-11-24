import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { parseCookies, setCookie } from 'nookies'
import Router from "next/router"

function Dashboard() {
    const { userAuth } = useContext(AuthContext)

    console.log(userAuth)

    function logout() {
        setCookie(undefined, 'dashboard.token', userAuth._id, {
            maxAge: -1
        })

        Router.push('/login')
    }

    return(
        <div className="h-full w-full">
            <header className="w-full h-14 bg-blue-800 text-white flex items-center justify-between px-[2%]">
                <div className="flex gap-3 items-center h-14">
                    <div className="flex flex-col gap-1 w-8 cursor-pointer p-1">
                        <div className="w-full h-[1px] bg-white"></div>
                        <div className="w-full h-[1px] bg-white"></div>
                        <div className="w-full h-[1px] bg-white"></div>
                    </div>
                    <p onClick={logout} className="cursor-pointer">sair</p>
                </div>
                <div className="flex items-center gap-3">
                    <p>{ userAuth.username }</p>
                    <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                </div>
            </header>
            <section className="w-full h-[calc(100vh-56px)] bg-gray-200 flex items-center justify-center">

            </section>
        </div>
    )
}

export default Dashboard

export const getServerSideProps = async (ctx) => {
    const { 'dashboard.token': token } = parseCookies(ctx)

    if(!token){
        return{
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}
