import {useState} from 'react'
import Dashboard from './Dashboard'

function Statics() {

    const [navbarStatus, setNavbarStatus] = useState(false)

  return (
    <div className='flex'>
      <Dashboard Navbar={status => setNavbarStatus(status)} />
      <div className={` ${navbarStatus ? 'hidden':'block'} w-screen relative left-0`}>
        <p className='text-center text-green text-3xl font-bold'>Statics</p>
      </div>
    </div>
  )
}

export default Statics
