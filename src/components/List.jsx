import Router from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import api from "../services/api"

export function List() {

    const [posts, setPosts] = useState()

    useEffect(() => {
        async function listPosts() {
            try{
                const apiPosts = await api.get(`posts`)
                setPosts(apiPosts.data.posts)
            }catch(err){
                alert(err)
            }
        } 

        listPosts()
    }, [])

    return( 
        <div className="my-20 w-[94%] flex flex-wrap justify-center gap-4">
            {
                posts?.map((item, key) => {

                    return (
                        <div key={key} className="h-[360px] shadow-lg flex justify-center w-96 bg-white hover:bg-gray-50 rounded-lg text-ellipsis overflow-hidden cursor-pointer hover:underline transition-all">
                            <div className="w-full" onClick={() => {
                                Router.push(`/post/${item._id}`)
                            }}>
                                <div className={`w-full h-64 ${(item.thumbnail === 'default.png') ? 'bg-[url(/images/default.png)]' : ''} bg-no-repeat bg-cover bg-center`}></div>
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