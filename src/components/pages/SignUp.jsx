import googleIcon from '../../assets/svg/googleIcon.svg'
import {ReactComponent as VisibilityIcon} from '../../assets/svg/visibilityIcon.svg'
import {Link , useNavigate} from 'react-router-dom'
import {app} from '../../firebase.config'
import {useState} from 'react'
import {getAuth , createUserWithEmailAndPassword , updateProfile} from 'firebase/auth'
import OAuth from './OAuth'
import { db } from '../../firebase.config'
import {setDoc , doc , serverTimestamp} from 'firebase/firestore'


function SignUp() {

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:''
  })

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try{
      const auth = getAuth(app)
      const userCredential = await createUserWithEmailAndPassword(auth ,formData.email , formData.password )
      updateProfile(auth.currentUser , {
        displayName: formData.name
      })
      const user = userCredential.user
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db , 'users' , user.uid) , formDataCopy)
      navigate('/shop')
      console.log(userCredential.user)
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className='w-screen h-max grid grid-cols-1 grid-rows-1 justify-items-center py-8 bg-beige'>
      <div className="glass w-10/12 sm:w-6/12 lg:w-4/12 rounded-2xl py-6">
        <h2 className='mx-auto text-center text-4xl font font-bold text-green'>Sign Up</h2>
        <form onSubmit={onSubmit} className='mt-8 grid grid-cols-1 justify-items-center'>
          <input
            type="text" 
            onChange={(e) => setFormData({...formData ,name :e.target.value})} 
            value={formData.name} 
            placeholder="Name" 
            className="input input-bordered border-beige w-full my-4 max-w-xs"
          />
          <input 
            type="text" 
            onChange={(e) => setFormData({...formData ,email :e.target.value})} 
            value={formData.email} 
            placeholder="Email" 
            className="input input-bordered border-beige w-full my-4 max-w-xs" 
          />
          <input  
            type={showPassword?'text' : 'password'} 
            onChange={(e) => setFormData({...formData ,password :e.target.value})} 
            value={formData.password}
            placeholder="Password"
            className="input input-bordered border-beige w-full my-4 max-w-xs"
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
            <Link to='/' className="text-green">Return Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
