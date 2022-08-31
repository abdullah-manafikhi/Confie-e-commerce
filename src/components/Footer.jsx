import {FaFacebook , FaInstagram , FaTwitter , FaRegCopyright} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <footer className='bg-green w-12/12 rounded-t-lg mx-auto'>
        <div className="grid grid-cols-1 sm:grid-cols-3 content-center h-fit py-12 mt-24 border-b-2 text-beige">
             <div className="text-center justify-self-center">  
                <h2 className='text-3xl text-white font-bold'>Confie</h2>
                <div className="flex px-16 py-6 ">
                    <span className='text-white mr-4 text-2xl  hover:text-beige'><FaFacebook /></span>
                    <span className='text-white mr-4 text-2xl hover:text-beige'><FaInstagram /></span>
                    <span className='text-white text-2xl hover:text-beige'  ><FaTwitter /></span>
                </div>
            </div> 
            <div className="grid justify-center text-sm text-white">
                <h2 className='justify-self-center text-2xl relative bottom-2'>Pages</h2>
                <Link to='/' className='justify-self-center hover:text-beige'>Home</Link>
                <Link to='/' className='justify-self-center hover:text-beige'>Shop</Link>
                <Link to='/' className='justify-self-center hover:text-beige'>About Us</Link>
            </div>
            <div className="grid justify-center text-sm mt-8 sm:mt-0 text-white">
                <h2 className='justify-self-center text-2xl relative bottom-2'>Address</h2>
                <p className='justify-self-center'>Syria - Damascus</p>
                <p className='justify-self-center'>Eygpt - Cairo</p>
                <p className='justify-self-center'>UAE - Dubai</p>
            </div>
        </div>
        <div className="flex justify-around py-2">
            <p className='flex text-white text-sm'>-<FaRegCopyright className='mt-1 mx-1' /> All Right Reserevd For Abdullah Manafikhi -</p>
            <p className='text-white text-sm'> - privacy  &#x26; policy -</p>
        </div>
    </footer>
  )
}

export default Footer
