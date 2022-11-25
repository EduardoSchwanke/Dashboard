import Link from 'next/link'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from 'react'

function Login() { 
    const { register, handleSubmit } = useForm()
    const { signUp, errorSignup } = useContext(AuthContext)
    const [formPassword, setFormPassword] = useState('password')

    async function handleSignUp(data) {
        if(!data.username || !data.password || !data.email){
            return alert('Informe todos os campos')
        }
        await signUp(data)
    }
    return(
        <div className="flex ">
            <div className="w-[50vw] h-[100vh] bg-[url(/images/bg-auth.jpg)] rounded-r-3xl"></div>
            <div className="w-[50vw] h-[100vh] flex items-center justify-center">
                <div className="w-96 flex flex-col items-center">
                    <div className="mb-1">
                        <p className="py-2 font-bold text-3xl text-center text-gray-700">Cadastre-se!</p>
                    </div>
                    <form className="flex flex-col mx-3 my-6 w-96 items-center" onSubmit={handleSubmit(handleSignUp)}>
                        {!errorSignup ? '' : 
                            <div className={`w-full p-2 mb-3 border border-red-600 text-red-600 text-center`}>
                                Nome de usuário ou email já cadastrado!
                            </div>}
                        <input {...register('username')} required defaultValue="Schwanke" type="text" placeholder="Nome de usuário" className="w-full rounded-md mb-3"/>
                        <input {...register('email')} required defaultValue="carvalhoe089@gmail.com"type="email" placeholder="Seu e-mail" className="w-full rounded-md mb-3"/>
                        <div className="relative w-full">
                            <input {...register('password')} required defaultValue="mundicoa10" type={formPassword} placeholder="Senha" className="w-full rounded-md mb-3"/>
                            {
                                (formPassword === 'password') ? <AiOutlineEye onClick={() => {
                                    if(formPassword === 'password'){
                                        setFormPassword('text')
                                    }else{
                                        setFormPassword('password')
                                    }
                                }} 
                                className='absolute top-[10px] right-1 p-1 text-2xl cursor-pointer'
                                /> : <AiOutlineEyeInvisible onClick={() => {
                                    if(formPassword === 'password'){
                                        setFormPassword('text')
                                    }else{
                                        setFormPassword('password')
                                    }
                                }} 
                                className='absolute top-[10px] right-1 p-1 text-2xl cursor-pointer'
                                />
                            }
                        </div>
                        <div className="flex w-full mb-3">
                            <Link href="/login" className="text-sm text-blue-600 cursor-pointer underline underline-offset-2">
                                Já tem uma conta?
                            </Link>
                        </div>
                        <input type="submit" value="Cadastrar" className="bg-blue-500 cursor-pointer py-2 w-56 rounded-md text-white"/>
                    </form>
                </div>
            </div>
        </div>
    )
} 

export default Login