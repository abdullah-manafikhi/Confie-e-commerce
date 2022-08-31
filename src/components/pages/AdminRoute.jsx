import { getAuth } from '@firebase/auth'
import {Navigate , Outlet} from 'react-router-dom'
import { NotFound } from 'http-errors'

function AdminRoute() {

    const auth = getAuth() 
    return auth.currentUser === null ? <Navigate to='/not-found' /> :  auth.currentUser.email == 'admin@gmail.com'? <Outlet /> : <Navigate to='/shop' />
}

export default AdminRoute
