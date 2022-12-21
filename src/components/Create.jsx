import { Editor } from "@tinymce/tinymce-react"
import { useRef, useState } from 'react'

export function Create() {
    const editorRef = useRef(null);
    const [post, setPost] = useState()

    function createPost(e) {
        e.preventDefault()
        console.log(post)
    }

    return (
        <div className="mx-[20%] h-fit mt-12 bg-white w-[800px] p-9 rounded-md shadow-xl mb-44 mt-24 sm:mx-[4%] sm:mt-3 dark:bg-slate-700">
            <form className="flex flex-col items-center" onSubmit={createPost}>
                <h1 className="mb-4 text-2xl text-slate-700 dark:text-white">Crie um post</h1>
                
                <div className="w-full flex flex-col">

                    <div className="my-2">
                        <label htmlFor="text" className="dark:text-white">Titulo</label>
                        <input type="text" name="text" required id="text" className="mb-6 w-full rounded-sm"/>
                        
                    </div>

                    <Editor
                        onChange={(event) => {
                            setPost(event.level.content)
                        }}
                        id="FIXED_ID"
                        className="visible"
                        apiKey='vz0a8ezy8aezovx052q9ksh0nkotirr1cu6suwxudjz3p0oq'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue='<p>This is the initial content of the editor.</p>'
                        init={{
                        height: 500,
                        skin: 'snow',
                        icons: 'thin',
                        plugins: 'quickbars image lists code table codesample',
                        toolbar: 'blocks | forecolor backcolor | bold italic underline strikethrough | link image blockquote codesample | align bullist numlist | code ',
                        content_style: 'body { margin: 2rem 10%; }'
                        }}
                    />

                    <div dangerouslySetInnerHTML={{__html: post}}>
                        
                    </div>
                </div>

                <div className="w-full h-20 fixed bottom-0 right-0 bg-gray-100 flex items-center justify-end px-7 gap-6 dark:bg-gray-100">
                    <button className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all" type="button" onClick={() => {
                        window.location.reload()
                    }}>Refresh</button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all">Atualizar</button>
                </div>

            </form>
        </div>
    )
}