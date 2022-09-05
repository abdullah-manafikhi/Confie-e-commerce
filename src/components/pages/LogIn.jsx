import { useState , useEffect , useContext} from 'react';
import {Link , useNavigate} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import {toast} from 'react-toastify'
import {ReactComponent as VisibilityIcon} from '../../assets/svg/visibilityIcon.svg'
import firebaseContext from '../contexts/FirebsaeContext';
import OAuth from './OAuth';
import FirebaseContext from '../contexts/FirebsaeContext';


function LogIn() {

  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  // intializing the context
  const {dispatch} = useContext(FirebaseContext)
  
  const navigate = useNavigate()  
  
  //checking wether the user is logged in , if he is logged in the he will be redirected to shop page
  const auth = getAuth();
  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          console.log(user)
        if (user) {
          console.log(user)
          setUserName(user.displayName)
          dispatch({
            type: 'USER_CREDENTIALS',
            payload:user
          })
          setIsLoggedIn(true)
        } }
      )
  } , [])
    
  useEffect(() => {
    isLoggedIn ? userName === 'admin' ? navigate('/dashboard/users') : navigate('/shop') : navigate('/log-in')
  } , [isLoggedIn])


  //logging in 
  
  const onSubmit = async (e) => {
    e.preventDefault()
    try{
      const reAuth = async () => {
        const userCredential = await signInWithEmailAndPassword(auth , formData.email , formData.password)
        if(userCredential.user.email === 'admin@gmail.com'){
          toast.success("you are logged in !")
          navigate('/dashboard/users')
        }
        else{
          toast.success("you are logged in !")
          dispatch({
            type: 'USER_CREDENTIALS',
            payload:userCredential.user
          })
          navigate('/shop')
        }
        }
        reAuth()
    }
    catch(error){
      console.log(error)
      toast.error('you have enterd bad credentials')
    }
  }

  const googleOnClick = async () => {

  }

  return (
    <div className='w-screen h-full grid grid-cols-1 grid-rows-1 justify-items-center py-20 bg-beige'>
      <div className="glass w-10/12 sm:w-6/12 lg:w-4/12 rounded-2xl py-6 px-4">
        <h2 className='mx-auto text-center text-4xl font font-bold text-green'>Log in</h2>
        <form onSubmit={onSubmit} className='mt-8 grid grid-cols-1 justify-items-center'>
          <input 
            type="text" 
            onChange={(e) => {setFormData({...formData , email : e.target.value})}} 
            value={formData.email} 
            placeholder="Email" 
            className="input input-bordered border-beige w-full my-4 max-w-xs" 
          />
          <input 
            type={showPassword?'text' : 'password'} 
            onChange={(e) => {setFormData({...formData , password : e.target.value})}} 
            value={formData.password} 
            placeholder="Password" className="input input-bordered border-beige w-full my-4 max-w-xs" 
          />
          <VisibilityIcon 
            onClick={() => {setShowPassword((prevState) => {return !prevState}) }} 
            fill='black' 
            width='20px' 
            height='24px' 
            className='relative bottom-12 -right-28 sm:relative sm:-right-32' 
          />
          <div className="text-end w-8/12 my-6">
            <button className="btn bg-green">submit</button>
          </div>
        </form>
        <div className="grid grid-cols-1 justify-items-center">
          <OAuth />
          <div className="w-10/12 text-center mt-4">
            <Link to='/sign-up' className="text-green">Sign Up instead</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn
