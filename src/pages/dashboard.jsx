import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import api from "../services/api"
import { parseCookies } from 'nookies'

function Dashboard() {
    const { userAuth } = useContext(AuthContext)

    return(
        <div>
            { userAuth.username }
        </div>
    )
}

export default Dashboard

export const getServerSideProps = async (ctx) => {
    const { 'dashboard.token': token } = parseCookies(ctx)

    if(!token){
        return{
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}
