import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

function Dashboard() {
    const {name} = useContext(AuthContext)

    return(
        <div>
            {name}
        </div>
    )
}

export default Dashboard