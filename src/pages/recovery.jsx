import { Switch } from '@headlessui/react'
import Link from 'next/link'
import { parseCookies, setCookie } from 'nookies'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'

function Auth(props) {
    const { register, handleSubmit } = useForm()
    const { sendMail } = useContext(AuthContext)
    const [formEmail, setFormEmail] = useState(false)
    const [email, setEmail] = useState(false)
    const [theme, setTheme] = useState(() => {
        if(props.USER_THEME){
            return props.USER_THEME
        }else{
            return 'light'
        }
    })

    async function sendEmail(data) {
        data.email = email
        await sendMail(data) 
    }

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
        <div className="flex dark:bg-slate-800">
            <div className="w-[50vw] h-[100vh] bg-[url(/images/bg-auth.jpg)] rounded-r-3xl"></div>
            <div className="w-[50vw] h-[100vh] flex items-center justify-center">
            <Switch
                    checked={theme == 'dark'}
                    onChange={toggleTheme}
                        className={`${
                            theme == 'dark' ? 'bg-blue-600' : 'bg-gray-200'
                        } absolute top-4 right-4 inline-flex h-6 w-11 items-center rounded-full`}
                    >
                    <span
                        className={`${
                            theme == 'light' ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                </Switch>
                <div className="w-96 flex flex-col items-center">
                    <div className="mb-1">
                        <p className="font-bold text-3xl text-center text-gray-700 dark:text-white">Encontre sua conta</p>
                    </div>
 
                    <form className="flex flex-col mx-3 my-6 w-96 items-center" onSubmit={handleSubmit(sendEmail)}>
                        <div className='relative w-full group'>
                            <label htmlFor="email" className={`text-gray-600 absolute rounded-sm top-3 mx-3 px-1 bg-white cursor-text group-focus-within:text-xs group-focus-within:-top-[10px] transition-all ${formEmail ? 'text-xs -top-[10px]' : ''}`}>Email da sua conta</label>
                            <input {...register('email')} onChange={(props) => {
                                setEmail(props.target.value)
                                if(props.target.value.length >= 1){
                                    setFormEmail(true)
                                }else{
                                    setFormEmail(false)
                                }
                            }} required type="email" id='email' className="w-full h-12 rounded-md mb-1"/>
                        </div>
                        <div className="flex justify-between w-full mb-5">
                            <Link href="/login" className="text-sm text-blue-600 cursor-pointer underline underline-offset-2 dark:text-blue-400">
                                Já tem uma conta?
                            </Link>
                            <Link href="/signup" className="text-sm text-blue-600 cursor-pointer underline underline-offset-2 dark:text-blue-400">
                                Ainda não tem uma conta?
                            </Link>
                        </div>
                        <input type="submit" value="Buscar" className="bg-blue-500 cursor-pointer py-2 w-56 rounded-md text-white"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth

export const getServerSideProps = async (ctx) => {
    const cookies = parseCookies(ctx)

    if(!cookies){
        return{
            props: {

            }
        }
    }

    return {
        props: {
            USER_THEME: cookies.USER_THEME
        }
    }
}