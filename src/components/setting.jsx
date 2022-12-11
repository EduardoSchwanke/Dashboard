import { useState } from "react";
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import api from "../services/api";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";

export function Setting() {
    const { userAuth } = useContext(AuthContext)
    const [ username, setUserName ] = useState(userAuth.username)
    const [ email, setEmail ] = useState(userAuth.email)
    const [ password, setPassword ] = useState(userAuth.password)
    const [ deleted, setDeleted ] = useState(false)
    const [ inputDelete, setInputDelete ] = useState('')

    async function UpdateUser(event) {
        event.preventDefault();

        try{
            await api.put(`user/${userAuth._id}`, { username, password, email })
            alert('atualizado com sucesso')
        }catch(err){
            alert(err)
        }
    }

    async function deleteAccount() {
        if(inputDelete !== 'Quero deletar'){
            return alert('errdo')
        }

        try{
            await api.delete(`user/${userAuth._id}`)
        }catch(err){
            return alert(err)
        }
        destroyCookie(undefined, 'dashboard.token')
        Router.push('/login')
    }

    return (
        <div className="mx-[20%] h-fit mt-12 bg-white w-[800px] p-9 rounded-md shadow-xl mb-44 mt-24 sm:mx-[4%] sm:mt-3 dark:bg-slate-700">
            <form className="flex flex-col items-center" onSubmit={UpdateUser}>
                <h1 className="mb-4 text-2xl text-slate-700 dark:text-white">Atualize seu dados</h1>
                <div className="w-20 h-20 mb-6 rounded-full border-4 border-dashed border-sky-500 border-separate cursor-pointer">
                    <div className="w-[72px] h-[72px] mb-6 rounded-full bg-white bg-[url(/images/perfil.png)] bg-cover"></div>
                </div>

                <div className="w-full flex flex-col">
                    <label htmlFor="username" className="dark:text-white">Username</label>
                    <input type="text" name="username" required id="username" defaultValue={userAuth.username} className="mb-6 ml-2 w-full rounded-sm"
                        onChange={({target}) => {
                            setUserName(target.value)
                            console.log(username)
                        }}
                    />
                </div>

                <div className="w-full flex flex-col">
                    <label htmlFor="email" className="dark:text-white">Email</label>
                    <input type="email" name="email" required id="email" defaultValue={userAuth.email} className="mb-6 ml-2 w-full rounded-sm"
                        onChange={({target}) => {
                            setEmail(target.value)
                            console.log(email)
                        }}
                    />
                </div>

                <div className="w-full flex flex-col">
                    <label htmlFor="password" className="dark:text-white">Password</label>
                    <input type="text" name="password" required id="password" defaultValue={userAuth.password} className="mb-6 ml-2 w-full rounded-sm"
                        onChange={({target}) => {
                            setPassword(target.value)
                            console.log(password)
                        }}
                    />
                </div>

                <div className="w-full h-20 fixed bottom-0 right-0 bg-gray-100 flex items-center justify-end px-7 gap-6 dark:bg-gray-100">
                    <button className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all" type="button" onClick={() => {
                        window.location.reload()
                    }}>Refresh</button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all">Atualizar</button>
                </div>

            </form>
            <div className="flex items-center gap-1 font-bold cursor-pointer w-fit" onClick={() => {
                setDeleted(!deleted)
                window.scrollTo(0, document.body.scrollHeight)
            }}>
                Delete account {deleted ? <BiDownArrow className="relative top-[2px] text-sm"/> : <BiUpArrow className="relative top-[2px] text-sm"/>}
            </div>
            <div className={`ml-2 mt-1 ${deleted ? 'block' : 'hidden'} transition-all`}>
                <label htmlFor="" className="flex mb-1">Para deletar sua conta escreva "Quero deletar" exatamente como estar escrito!</label>
                <input type="text" name="" id="" placeholder="Quero deletar" className="rounded-sm" onChange={({target}) => {
                    setInputDelete(target.value)
                }}/>
                <button className="ml-2 px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700 transition-all" onClick={deleteAccount}>
                    Delete
                </button>
            </div>
        </div>
    )
} 