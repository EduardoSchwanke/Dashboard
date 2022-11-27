import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { parseCookies, setCookie } from 'nookies'
import Router from "next/router"

function Dashboard() {
    const { userAuth } = useContext(AuthContext)
    const [menu, setMenu] = useState('left-0')

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
                    <div className={`flex flex-col gap-1 w-8 cursor-pointer p-1 z-50 absolute transition-all ${menu === 'left-0' ? 'left-80' : 'left-4'}`} 
                        onClick={() => {
                            if(menu === '-left-96'){
                                setMenu('left-0')
                            }else{
                                setMenu('-left-96')
                            }
                        }}
                    >
                        <div className={`w-full h-[1px] bg-white relative transition-all ${menu === 'left-0' ? 'rotate-45 top-1' : 'rotate-0'}`}></div>
                        <div className={`w-full h-[1px] bg-white transition-all ${menu === 'left-0' ? 'hidden' : 'block'}`}></div>
                        <div className={`w-full h-[1px] bg-white transition-all ${menu === 'left-0' ? '-rotate-45' : 'rotate-0'}`}></div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <p>{ userAuth.username }</p>
                    <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                </div>
            </header>

            <div className={`w-96 h-[100vh] bg-slate-900 absolute flex flex-col top-0 ${menu} transition-all pt-14`}>
                <div className="w-full flex flex-col items-center mb-8">
                    <div className="w-24 h-24 bg-gray-400 rounded-full mb-2"></div>
                    <p className="text-white">{ userAuth.username }</p>
                </div>
                
                <div className="flex flex-col justify-evenly text-white h-[60vh]">
                    <div className="cursor-pointer hover:bg-slate-700 px-6 pt-4">
                        <p>Create</p>
                        <div className="w-full h-[1px] bg-slate-500 mt-2"></div>
                    </div>
                    <div className="cursor-pointer hover:bg-slate-700 px-6 pt-4">
                        <p>Edit</p>
                        <div className="w-full h-[1px] bg-slate-500 mt-2"></div>
                    </div>
                    <div className="cursor-pointer hover:bg-slate-700 px-6 pt-4">
                        <p>You list</p>
                        <div className="w-full h-[1px] bg-slate-500 mt-2"></div>
                    </div>
                    <div className="cursor-pointer hover:bg-slate-700 px-6 pt-4">
                        <p>List</p>
                        <div className="w-full h-[1px] bg-slate-500 mt-2"></div>
                    </div>
                    <div className="cursor-pointer hover:bg-slate-700 px-6 pt-4">
                        <p>Setting</p>
                        <div className="w-full h-[1px] bg-slate-500 mt-2"></div>
                    </div>
                    <div className="cursor-pointer hover:bg-slate-700 px-6 pt-4">
                        <p onClick={logout}>sair</p>
                        <div className="w-full h-[1px] bg-slate-500 mt-2"></div>
                    </div>
                </div>
            </div>

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
