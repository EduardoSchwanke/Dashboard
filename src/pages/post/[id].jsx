import { useRouter } from "next/router"
import api from "../../services/api"
import { useEffect, useState } from "react"

function Post() {
    const router = useRouter()
    const id = router.query.id
    const [post, setPost] = useState()

    useEffect(() => {
        async function requirePost() {
            try{
                const postRequired = await api.get(`post_unique/${id}`)
                setPost(postRequired.data.post)
            }catch(err){
                alert(err)
            }
        } 

        requirePost()
    }, [id])

    console.log(post)
    return (
        <div className="w-full flex justify-center">
            <div className="w-[94%] my-14">
                {
                    post ? <div dangerouslySetInnerHTML={{ __html: post.content }}></div> : ''
                }
            </div>
        </div>
    )
}
//<div dangerouslySetInnerHTML={{ __html: post.content }}></div>
export default Post