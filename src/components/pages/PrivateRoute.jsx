import {Navigate , Outlet} from 'react-router-dom'
import useAuthStatus from '../../hooks/useAuthStatus'

function PrivateRoute() {

    const {loggedIn , checkingStatus} = useAuthStatus()
    const test = useAuthStatus()
    if(checkingStatus){
        return <h2>Loading....</h2>
    }
    return loggedIn? <Outlet /> : <Navigate to='/log-in' />
}

export default PrivateRoute
