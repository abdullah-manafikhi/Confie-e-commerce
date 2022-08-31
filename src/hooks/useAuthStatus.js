import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useState , useEffect} from 'react'

const useAuthStatus = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    useEffect(() => {
        try{
            const auth = getAuth()
            onAuthStateChanged(auth , (user) => {
                if(user){
                    setLoggedIn(true)
                }
                setCheckingStatus(false)
            })
        }
        catch(error){
            console.log(error)
        }
    } , [])
    return{loggedIn , checkingStatus}
}

export default useAuthStatus

