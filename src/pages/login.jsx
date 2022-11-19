import Link from 'next/link'

function Login() {
    return(
        <div className="flex ">
            <div className="w-[50vw] h-[100vh] bg-[url(/images/bg-auth.jpg)] rounded-r-3xl"></div>
            <div className="w-[50vw] h-[100vh] flex items-center justify-center">
                <div className="w-96 flex flex-col items-center">
                    <div className="mb-8">
                        <h2 className="font-bold text-3xl text-center text-gray-700">Bem vindo!</h2>
                        <p className="py-2 text-sm text-center text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <button className="bg-red-500 py-2 w-56 text-white rounded-md mb-6">Google</button>
                    <p className="text-gray-600">ou</p>
                    <form className="flex flex-col mx-3 my-6 w-96 items-center">
                        <input type="text" placeholder="Nome de usuário" className="w-full rounded-md mb-3"/>
                        <input type="password" placeholder="Senha" className="w-full rounded-md mb-1"/>
                        <div className="flex justify-between w-full mb-3">
                            <Link href="/recovery" className="text-sm text-blue-600 cursor-pointer underline underline-offset-2">
                                Esqueceu usuário ou senha?
                            </Link>
                            <Link href="/signup" className="text-sm text-blue-600 cursor-pointer underline underline-offset-2">
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