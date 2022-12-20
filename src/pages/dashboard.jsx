import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { parseCookies, setCookie } from 'nookies'
import Router from "next/router"
import { Switch } from "@headlessui/react"
import { Create } from "../components/Create"
import { Edit } from "../components/Edit"
import { YouList } from "../components/YouList"
import { List } from "../components/List"
import { Setting } from "../components/setting"

function Dashboard(props) {
    const { userAuth } = useContext(AuthContext)
    const [menu, setMenu] = useState('-left-96')
    const [component, setComponent] = useState(props.component_render)

    function logout() {
        setCookie(undefined, 'dashboard_token', userAuth._id, {
            maxAge: -1
        })

        setCookie(undefined, 'component_render', '', {
            maxAge: -1
        })

        Router.push('/login')
    }

    const [theme, setTheme] = useState(() => {
        if(props.USER_THEME){
            return props.USER_THEME
        }else{
            return 'light'
        }
    })

    useEffect(() => {
        document.documentElement.classList.add(props.USER_THEME);
    }, [])

    function toggleTheme() {
        if(theme == 'light'){
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            setCookie(null, 'USER_THEME', 'dark', {
                maxAge: 60 * 60 * 24,
                path: '/'
            })
            setTheme('dark')
        }else{
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            setCookie(null, 'USER_THEME', 'light', {
                maxAge: 60 * 60 * 24,
                path: '/'
            })
            setTheme('light')
        }   
    }

    

    return(
        <div className="h-full w-full">
            <header className="w-full z-10 fixed h-14 text-white flex items-center justify-between px-[2%] bg-slate-800 border-b-2 border-slate-900">
                <div className="flex gap-3 items-center h-14 z-50">
                    <div className={`flex flex-col gap-1 w-8 cursor-pointer p-1 transition-all relative ${menu === 'left-0' ? 'left-80' : 'left-4'}`} 
                        onClick={() => {
                            if(menu === '-left-96'){
                                setMenu('left-0')
                            }else{
                                setMenu('-left-96')
                            }
                        }}
                    >
                        <div className={`w-full h-[1px] bg-white relative transition-all ${menu === 'left-0' ? 'rotate-45 top-[5px]' : 'rotate-0'}`}></div>
                        <div className={`w-full h-[1px] bg-white transition-all ${menu === 'left-0' ? 'hidden' : 'block'}`}></div>
                        <div className={`w-full h-[1px] bg-white transition-all ${menu === 'left-0' ? '-rotate-45' : 'rotate-0'}`}></div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <p>{ userAuth.username }</p>
                    <div className="w-9 h-9 rounded-full bg-white bg-[url(/images/perfil.png)] bg-cover"></div>
                </div>
            </header>

            <div className={`w-96 h-full z-50 bg-slate-900 fixed flex flex-col top-0 ${menu} transition-all pt-14`}>
                <div className="flex absolute top-5 left-5">
                    <Switch
                        checked={theme == 'dark'}
                        onChange={toggleTheme}
                            className={`${
                                theme == 'dark' ? 'bg-blue-600' : 'bg-gray-200'
                            }  inline-flex h-6 w-11 items-center rounded-full`}
                        >
                        <span
                            className={`${
                                theme == 'light' ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                    </Switch>
                    <div className={`flex flex-col gap-1 w-8 cursor-pointer p-1 transition-all relative ${menu === 'left-0' ? 'left-[270px]' : 'left-4'}`} 
                            onClick={() => {
                                if(menu === '-left-96'){
                                    setMenu('left-0')
                                }else{
                                    setMenu('-left-96')
                                }
                            }}
                        >
                            <div className={`w-full h-[1px] bg-white relative transition-all ${menu === 'left-0' ? 'rotate-45 top-[5px]' : 'rotate-0'}`}></div>
                            <div className={`w-full h-[1px] bg-white transition-all ${menu === 'left-0' ? 'hidden' : 'block'}`}></div>
                            <div className={`w-full h-[1px] bg-white transition-all ${menu === 'left-0' ? '-rotate-45' : 'rotate-0'}`}></div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center mb-8">
                    <div className="w-24 h-24 bg-white rounded-full mb-2 bg-[url(/images/perfil.png)] bg-cover"></div>
                    <p className="text-white">{ userAuth.username }</p>
                </div>
                
                <div className="flex flex-col justify-evenly text-white h-[45vh]">
                    <div className="cursor-pointer hover:bg-slate-700 px-6 pt-4" onClick={() => {
                        setComponent('create') 
                        setMenu('-left-96')
                        setCookie(null, 'component_render', 'create', {
                            maxAge: 60 * 60 * 24,
                            path: '/'
                        })
                    }}>
                        <p>Create</p>
                        <div className="w-full h-[1px] bg-slate-500 mt-2"></div>
                    </div>
                    <div className="cursor-pointer hover:bg-slate-700 px-6 pt-4" onClick={() => {
                        setComponent('edit')
                        setMenu('-left-96')
                        setCookie(null, 'component_render', 'edit', {
                            maxAge: 60 * 60 * 24,
                            path: '/'
                        })
                    }}>
                        <p>Edit</p>
                        <div className="w-full h-[1px] bg-slate-500 mt-2"></div>
                    </div>
                    <div className="cursor-pointer hover:bg-slate-700 px-6 pt-4" onClick={() => {
                        setComponent('list')
                        setMenu('-left-96')
                        setCookie(null, 'component_render', 'list', {
                            maxAge: 60 * 60 * 24,
                            path: '/'
                        })
                    }}>
                        <p>List</p>
                        <div className="w-full h-[1px] bg-slate-500 mt-2"></div>
                    </div>
                    <div className="cursor-pointer hover:bg-slate-700 px-6 pt-4" onClick={() => {
                        setComponent('setting')
                        setMenu('-left-96')
                        setCookie(null, 'component_render', 'setting', {
                            maxAge: 60 * 60 * 24,
                            path: '/'
                        })
                    }}>
                        <p>Setting</p>
                        <div className="w-full h-[1px] bg-slate-500 mt-2"></div>
                    </div>
                    <div onClick={logout} className="cursor-pointer hover:bg-slate-700 px-6 pt-4">
                        <p >Sair</p>
                        <div className="w-full h-[1px] bg-slate-500 mt-2"></div>
                    </div>
                </div>
            </div>

            <section className="w-full min-h-[calc(100vh-56px)] flex justify-center z-10 bg-[linear-gradient(45deg,rgb(30,41,59)51%,rgba(235,235,235,1)51%,rgba(235,235,235,1)100%)]">
                    {
                        (component === 'create') && <Create/>
                    }
                    {
                        (component === 'edit') && <Edit/>
                    }
                    {
                        (component === 'youlist') && <YouList/>
                    }
                    {
                        (component === 'list') && <List/>
                    }
                    {
                        (component === 'setting') && <Setting/>
                    }
            </section>
            <div className={`w-full h-[100vh] absolute top-0 left-0 bg-transparent z-20 ${(menu === 'left-0') ? 'flex' : 'hidden'}`} onClick={() => {
                setMenu('-left-96')
            }}></div>
        </div>
    )
}

export default Dashboard

export const getServerSideProps = async (ctx) => {
    const { 'dashboard_token': token } = parseCookies(ctx)
    const cookies = parseCookies(ctx)

    if(!token){
        return{
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    if(cookies.USER_THEME === undefined){
        return{
            props: {

            }
        }
    }

    return {
        props: {
            USER_THEME: cookies.USER_THEME,
            component_render: cookies.component_render,
            dashboard_token: token
        }
    }
}
