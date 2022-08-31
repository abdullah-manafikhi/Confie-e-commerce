import {useLocation , useNavigate} from 'react-router-dom'
import {getAuth , signInWithPopup , GoogleAuthProvider , credentialFromResult} from 'firebase/auth'
import {doc , getDoc , setDoc , serverTimestamp} from 'firebase/firestore'
import {db} from '../../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../../assets/svg/googleIcon.svg'

function OAuth() {

    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try{
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth ,provider)
        const user = result.user

        const docRef = doc(db , 'users' , user.uid)
        const docSnap = await getDoc(docRef)
        
        //if user does not exist , create user
           if(!docSnap.exists()){
                setDoc(doc(db , 'users' , user.uid) , {
                    name : user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate("/")
        }
        catch(error){
            console.log(error)
            toast.error("could not autherize with Google")
        }
    }
     
  return (
    <div className='grid grid-cols-1 justify-items-center'>
        <p>Sign {location.pathname === '/sign-up' ? 'Up' : 'In'} with </p>
        <button className="mt-2" onClick={onGoogleClick}>
            <img className='h-12 w-12' src={googleIcon} alt="google" />
        </button>
    </div>
  )
}

export default OAuth
