import { Editor } from "@tinymce/tinymce-react"
import { parseCookies } from "nookies";
import { useRef, useState } from 'react'
import api from "../services/api";

export function Create() {
    const editorRef = useRef(null);
    const [content, setContent] = useState()
    const [title, setTitle] = useState()

    const { 'dashboard_token': auth } = parseCookies()

    async function createPost(e) {
        e.preventDefault()
        console.log({ auth, title, content })
        try{
            await api.post(`post`, { auth, title, content })
            alert('post criado com sucesso')
        }catch(err){
            alert(err)
        }
    } 

    return (
        <div className="mx-[20%] h-fit mt-12 bg-white w-[800px] p-9 rounded-md shadow-xl mb-44 mt-24 sm:mx-[4%] sm:mt-3 dark:bg-slate-700">
            <form className="flex flex-col items-center" onSubmit={createPost}>
                <h1 className="mb-4 text-2xl text-slate-700 dark:text-white">Crie um post</h1>
                
                <div className="w-full flex flex-col">

                    <div className="my-2">
                        <label htmlFor="text" className="dark:text-white">Titulo</label>
                        <input type="text" name="text" required id="text" className="mb-6 w-full rounded-sm" onChange={(e) => {
                            setTitle(e.target.value)
                        }}/>
                        
                    </div>

                    <Editor
                        onChange={(event) => {
                            setContent(event.level.content)
                        }}
                        id="FIXED_ID"
                        apiKey='vz0a8ezy8aezovx052q9ksh0nkotirr1cu6suwxudjz3p0oq'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue='<p>This is the initial content of the editor.</p>'
                        init={{
                        height: 800,
                        skin: 'snow',
                        icons: 'thin',
                        plugins: 'quickbars image lists code table codesample',
                        toolbar: 'blocks | forecolor backcolor | bold italic underline strikethrough | link image blockquote codesample | align bullist numlist | code ',
                        content_style: 'body { margin: 2rem 10%; }'
                        }}
                    />
                </div>

                <div className="w-full h-20 fixed bottom-0 right-0 bg-gray-100 flex items-center justify-end px-7 gap-6 dark:bg-gray-100">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all">Atualizar</button>
                </div>

            </form>
        </div>
    )
}
