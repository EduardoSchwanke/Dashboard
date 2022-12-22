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

    console.log(posts)
    return( 
        <div className="my-20 w-[94%] flex flex-wrap justify-center gap-4">
            {
                posts?.map((item, key) => {

                    return (
                        <div key={key} className="flex justify-center w-96 h-[500px] bg-white hover:bg-gray-50 p-8 rounded-lg text-ellipsis overflow-hidden cursor-pointer hover:underline transition-all">
                            <div className="w-[900px]">
                                <h1>{item.title}</h1>
                                <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}