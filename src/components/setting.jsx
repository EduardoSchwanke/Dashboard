import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export function Setting() {
    const { userAuth } = useContext(AuthContext)
    return (
        <div className="mx-[20%] h-fit mt-12 bg-white w-[800px] p-9 rounded-md shadow-xl sm:mx-[4%] sm:mt-3">
            <form className="flex flex-col items-center">
                <h1 className="mb-4 text-2xl text-slate-700">Atualize seu dados</h1>
                <div className="w-20 h-20 mb-6 rounded-full border-4 border-dashed border-sky-500 border-separate cursor-pointer">
                    <div className="w-[72px] h-[72px] mb-6 rounded-full bg-slate-300"></div>
                </div>

                <div className="w-full flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" value={userAuth.username} className="mb-6 ml-2 w-full"/>
                </div>

                <div className="w-full flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={userAuth.email} className="mb-6 ml-2 w-full"/>
                </div>

                <div className="w-full flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" value={userAuth.password} className="mb-6 ml-2 w-full"/>
                </div>

                <div className="w-full h-20 absolute bottom-0 right-0 bg-white flex items-center justify-end px-7 gap-6">
                    <button className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all">Refresh</button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all">Atualizar</button>
                </div>

            </form>
        </div>
    )
} 