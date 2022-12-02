import { Switch } from '@headlessui/react'
import Link from 'next/link'
import { parseCookies, setCookie } from 'nookies'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { AuthContext } from '../contexts/AuthContext'

function Login(props) {
    const { register, handleSubmit } = useForm()
    const { signIn, errorLogin, setErrorLogin } = useContext(AuthContext)
    const [formName, setFormName] = useState(false)
    const [formPassword, setFormPassword] = useState(false)
    const [showPassword, setShowPassword] = useState('password')
    const [password, setPassword] = useState('')
    const [theme, setTheme] = useState(() => {
        if(props.USER_THEME){
            return props.USER_THEME
        }else{
            return 'light'
        }
    })
 
    async function handleSignIn(data) {
        setErrorLogin(false)
        if(!data.password){
            data.password = password
        }
        await signIn(data)
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
            <div className="w-[50vw] h-[100vh] bg-[url(/images/bg-auth.jpg)] rounded-r-3xl lg:w-[40%] md:w-[30%] sm:w-0"></div>
            <div className="w-[50vw] h-[100vh] flex items-center justify-center lg:w-[60%] md:w-[70%] sm:w-full">
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
                    <div className="mb-8">
                        <h2 className="font-bold text-3xl text-center text-gray-700 dark:text-white">Bem vindo!</h2>
                        <p className="py-2 text-sm text-center text-gray-600 dark:text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <button className="bg-red-500 py-2 w-72 text-white rounded-md mb-6">Sing in with Google</button>
                    <p className="text-gray-600 dark:text-white">ou</p>
                    <form className="flex flex-col mx-3 my-6 w-96 items-center xsm:w-[96%]" onSubmit={handleSubmit(handleSignIn)}>
                        
                        {!errorLogin ? '' : 
                            <div className={`w-full p-2 mb-3 border border-red-600 text-red-600 text-center`}>
                                Nome de usuário ou senha invalidos!
                            </div>}

                        <div className='relative w-full group'>
                            <label htmlFor="username" className={`text-gray-600 absolute rounded-sm top-3 mx-3 px-1 bg-white cursor-text group-focus-within:text-xs group-focus-within:-top-[10px] transition-all ${formName ? 'text-xs -top-[10px]' : ''}`}>Nome de usuário</label>
                            <input {...register('username')} onChange={(props) => {
                                if(props.target.value.length >= 1){
                                    setFormName(true)
                                }else{
                                    setFormName(false)
                                }
                            }} required type="text" id='username' className="w-full h-12 rounded-md mb-4"/>
                        </div>
                        <div className='relative w-full group'>
                            <label htmlFor="password" className={`text-gray-600 absolute rounded-sm top-3 mx-3 px-1 bg-white cursor-text group-focus-within:text-xs group-focus-within:-top-[10px] transition-all ${formPassword ? 'text-xs -top-[10px]' : ''}`}>Senha</label>
                            <input {...register('password')} onChange={(props) => {
                                setPassword(props.target.value)

                                if(props.target.value.length >= 1){
                                    setFormPassword(true)
                                }else{
                                    setFormPassword(false)
                                }
                            }} required type={showPassword} id='password' className="w-full h-12 rounded-md mb-1"/>
                            {
                                (showPassword === 'password') ? <AiOutlineEye onClick={() => {
                                    if(showPassword === 'password'){
                                        setShowPassword('text')
                                    }else{
                                        setShowPassword('password')
                                    }
                                }} 
                                className='absolute top-[13px] right-1 p-1 text-[1.6rem] cursor-pointer'
                                /> : <AiOutlineEyeInvisible onClick={() => {
                                    if(showPassword === 'password'){
                                        setShowPassword('text')
                                    }else{
                                        setShowPassword('password')
                                    }
                                }} 
                                className='absolute top-[13px] right-1 p-1 text-[1.6rem] cursor-pointer'
                                />
                            }
                        </div>
                        <div className="flex justify-between w-full mb-3">
                            <Link href="/recovery" className="text-sm text-blue-600 cursor-pointer underline underline-offset-2 dark:text-blue-400 xsm:text-[12px]">
                                Esqueceu usuário/senha?
                            </Link>
                            <Link href="/signup" className="text-sm text-blue-600 cursor-pointer underline underline-offset-2 dark:text-blue-400 xsm:text-[12px]">
                                Ainda não tem uma conta?
                            </Link>
                        </div>
                        <input type="submit" value="Login" className="bg-blue-500 cursor-pointer py-2 w-56 rounded-md text-white"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login

export const getServerSideProps = async (ctx) => {
    const { 'dashboard.token': token } = parseCookies(ctx)
    const cookies = parseCookies(ctx)

    if(token){
        return{
            redirect: {
                destination: '/dashboard',
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
            USER_THEME: cookies.USER_THEME
        }
    }
}