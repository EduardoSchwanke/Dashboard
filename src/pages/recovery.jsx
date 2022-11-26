import Link from 'next/link'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'

function Auth() {
    const { register, handleSubmit } = useForm()
    const { sendMail } = useContext(AuthContext)

    async function sendEmail(data) {
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
                        <input {...register('email')} required type="email" placeholder="Seu e-mail" className="w-full rounded-md mb-1"/>
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