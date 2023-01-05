import { parseCookies } from "nookies"
import { useState } from "react"
import { useEffect } from "react"
import api from "../services/api"
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

export function Edit() {

    const [posts, setPosts] = useState()

    useEffect(() => {
        const { 'dashboard_token': auth } = parseCookies()
        async function getPosts() {
            try{
                const apiPosts = await api.get(`post/${auth}`)
                setPosts(apiPosts.data.postsAuth)
            }catch(err){
                alert(err)
            }
        } 

        getPosts()
    }, [])

    return( 
        <div className="my-20 w-[94%] flex flex-wrap justify-center gap-4">
            {
                posts?.map((item, key) => {

                    return (
                        <div key={key} className="h-[360px] flex justify-center w-96 bg-white hover:bg-gray-50 rounded-lg text-ellipsis overflow-hidden cursor-pointer hover:underline transition-all">
                            <div className="w-full relative">
                                <div className={`w-full h-64 ${(item.thumbnail === 'default.png') ? 'bg-[url(/images/default.png)]' : ''} bg-no-repeat bg-cover bg-center`}></div>
                                <div className="flex gap-3 absolute right-3 top-3">
                                    <BiEditAlt className="text-green-500 text-xl hover:text-green-700 transition-all"
                                        onClick={() => {
                                            console.log('edit')
                                        }}
                                    />
                                    <BsTrash className="text-red-500 text-xl hover:text-red-700 transition-all"
                                        onClick={() => {
                                            console.log('trash')
                                        }}
                                    />
                                </div>
                                <div className="p-3">
                                    <h1>{item.title}</h1>
                                    <p>{item.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}