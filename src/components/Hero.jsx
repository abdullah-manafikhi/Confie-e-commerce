import heroImg from '../assets/images/heroImg.jpg'
import {Link} from 'react-router-dom'

function Hero() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 mt-24 p-8 mb-10'>
      <header className='mx-auto pt-24'>
        <h2 data-aos="fade-right" className='text-7xl text-green font-extrabold'>Confie</h2>
        <span className="text-beige text-2xl">Quality .. Trust ..Trendy </span>
        <div className="flex flex-auto justify-between mt-12">
          <Link to='/shop' className='btn btn-outline border-beige text-beige hover:bg-beige hover:text-white'>Shop Now</Link>
          <Link to='/' className='btn bg-green text-white hover:bg-dark-green'>About us</Link>
        </div>
      </header>
      <figure className='hidden sm:block'>
        <img src={heroImg} className='hero-img rounded-full' alt="decorated room" />
      </figure>
    </div>
  )
}

export default Hero
