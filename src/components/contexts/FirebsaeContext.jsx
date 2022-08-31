import {useState , createContext , useReducer} from 'react'
import FirebaseReducer from './FirebaseReducer'

const FirebaseContext = createContext()

export const FirebaseProvider = ({children}) => {

    const initialState = {
        purchasedItems: null ,
        fetchedItems: null   ,
        userCredential:null ,
        modifingProduct: null
    }

    const [state, dispatch] = useReducer(FirebaseReducer, initialState)

    return(
        <FirebaseContext.Provider value={{state , dispatch}}>
            {children}
        </FirebaseContext.Provider>
        )
}

export default FirebaseContext