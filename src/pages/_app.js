import '../../styles/main.css'
import AuthProvider from '../contexts/AuthContext'

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

//https://www.tiny.cloud/docs/demo/local-upload/

//vz0a8ezy8aezovx052q9ksh0nkotirr1cu6suwxudjz3p0oq
//vz0a8ezy8aezovx052q9ksh0nkotirr1cu6suwxudjz3p0oq