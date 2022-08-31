import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

function NotFound() {

  return (
      <>
    <Navbar />
    <div className='flex items-center justify-center w-screen h-screen'>
        <div className="text-center">
            <p className='text-6xl font-extrabold text-green'>Ooops !</p>
            <p className='text-2xl font-semibold mt-4'>404-PAGE NOT FOUND</p>
            <Link to='/' className='btn text-2xl mt-4'>Go Back Home</Link>
        </div>
    </div>
    </>
  )
}

export default NotFound
