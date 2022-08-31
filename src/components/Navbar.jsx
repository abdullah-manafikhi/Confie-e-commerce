import {useState} from 'react'
import {Link} from 'react-router-dom'
import {getAuth , signOut} from 'firebase/auth'
import { toast } from 'react-toastify'

function Navbar({isLoggedIn , userName}) {

const [navToggle, setNavToggle] = useState('hidden')
console.log(navToggle)

// Sign Out
  const onClick = async () => {
    try{
      const auth = getAuth()
      const logOut = await signOut(auth)
      console.log(auth.currentUser)
      isLoggedIn = false
      toast.success("you signed out")      
    }
    catch(error){
      console.log(error)
    }  
  }
console.log(userName)
  return (
    <nav className='flex flex-auto justify-between pt-2 text-green text-xl font-bold h-fit'>
      <label className="btn btn-circle swap swap-rotate absolute  left-6 bg-green sm:hidden">
        <input type="checkbox" onClick={() => setNavToggle((prevState) => prevState === 'hidden' ? "block" : "hidden") } />
        <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
        <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
      </label>
        <div className={`${navToggle} grid grid-cols-1 pl-24 sm:flex sm:justify-between sm:pl-8 w-72`}>
            <Link to='/' className='hover:text-emerald-500'>Home</Link >
            <Link to='/shop' className='hover:text-emerald-500'>Shop</Link >
            { isLoggedIn ? (<Link to='/profile' className='hover:text-emerald-500'>Profile</Link >) : ""}
            <Link to='/about' className='hover:text-emerald-500'>About</Link >
        </div>
        { 
        //choosing wether to display the login and sign up buttons or the sign up buttons
          isLoggedIn ? userName !== 'admin'?
          (
            <div className="absolute right-6">
              <span className="font-normal relative right-6">Hello {userName} !</span>
              <Link  to='/log-in'><button type='submit' onClick={onClick} className='ml-4 btn btn-primary bg-green border-green hover:bg-dark-green hover:border-dark-green'> Sign Out </button></Link >
            </div>
          ):
          (
            <div className="absolute right-6">
              <Link to='/dashboard/users' className="btn btn-ghost">Dashboard</Link >
              <Link  to='/log-in'><button type='submit' onClick={onClick} className='ml-4 btn btn-primary bg-green border-green hover:bg-dark-green hover:border-dark-green'> Sign Out </button></Link >
            </div>
          ):
          <div className="absolute right-6">
              <Link to='/log-in' className="btn btn-ghost">Log In</Link >
              <Link to='/sign-up' className="ml-4 btn btn-primary bg-green border-green hover:bg-dark-green hover:border-dark-green">Sign Up</Link >
          </div>
        }
    </nav>
  )
}
   
export default Navbar
