import Link from 'next/link'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'

function Auth() {
    const { register, handleSubmit } = useForm()
    const { sendMail } = useContext(AuthContext)
    const [formEmail, setFormEmail] = useState(false)
    const [email, setEmail] = useState(false)

    async function sendEmail(data) {
        data.email = email
        await sendMail(data) 
    }
    return(
        <div className="flex ">
            <div className="w-[50vw] h-[100vh] bg-[url(/images/bg-auth.jpg)] rounded-r-3xl"></div>
            <div className="w-[50vw] h-[100vh] flex items-center justify-center">
                <div className="w-96 flex flex-col items-center">
                    <div className="mb-1">
                        <p className="font-bold text-3xl text-center text-gray-700">Encontre sua conta</p>
                    </div>
 
                    <form className="flex flex-col mx-3 my-6 w-96 items-center" onSubmit={handleSubmit(sendEmail)}>
                        <div className='relative w-full group'>
                            <label htmlFor="email" className={`text-gray-600 absolute top-3 mx-3 px-1 bg-white cursor-text group-focus-within:text-xs group-focus-within:-top-[10px] transition-all ${formEmail ? 'text-xs -top-[10px]' : ''}`}>Email da sua conta</label>
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
                            <Link href="/login" className="text-sm text-blue-600 cursor-pointer underline underline-offset-2">
                                Já tem uma conta?
                            </Link>
                            <Link href="/signup" className="text-sm text-blue-600 cursor-pointer underline underline-offset-2">
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