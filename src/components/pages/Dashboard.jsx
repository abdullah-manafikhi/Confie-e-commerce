import {useState , useEffect} from 'react'
import {Link , useLocation} from 'react-router-dom'
import {BiChevronRight , BiCart , BiUser ,BiDollar ,BiStats} from 'react-icons/bi'

function Dashboard({Navbar}) {

  const [navbar, setNavbar] = useState(true)
  const [linkFocus, setLinkFocus] = useState({
    users : true,
    products: false,
    sales: false,
    statics:false,
  })

  const location = useLocation()

  useEffect(() => {
    switch(location.pathname){
      case '/dashboard/users' :
        setLinkFocus({
          users : true,
          products: false,
          sales: false,
          statics:false,
        });
        break;
        case '/dashboard/products:your-products' :
        setLinkFocus({
          users : false,
          products: true,
          sales: false,
          statics:false,
        });
        break;
        case '/dashboard/sales' :
        setLinkFocus({
          users : false,
          products: false,
          sales: true,
          statics:false,
        });
        break;
        case '/dashboard/statics' :
        setLinkFocus({
          users : false,
          products: false,
          sales: false,
          statics:true,
        });
        break;
    }
  } ,[location.pathname])

  const handleClick = () =>{
      console.log('navbar')
      Navbar(navbar)
      setNavbar((prevState) => !prevState) ;
      Navbar(navbar)
      console.log(navbar)

    }

  return (
    <div className={`fixed z-50 ${navbar ? '-left-72 md:-left-56 -mr-52' : ' md:left-0 '} h-screen`}>
      <div className={`w-72 h-screen bg-green text-center text-white pt-6 rounded-r-2xl`}>
        <h2 className={`${navbar ? 'hidden':'block'} text-3xl font-bold`}>Dashboard</h2>
        <span 
          className={` text-green rounded-l-2xl bg-white text-3xl block absolute -right-8`}
          onClick={() => handleClick()}
          ><BiChevronRight className={`${navbar ? 'rotate-0' : 'rotate-180'}`} /></span>
        <div className="text-start mt-10 pl-6">
          <Link
            to='/dashboard/users'
            className={`${linkFocus.users ? 'bg-lime-400 rounded-l-2xl py-2 pl-4' : ''} flex justify-between text-xl my-4 `}
            >
              <p>Users</p> 
              <BiUser className='mt-2 mr-4 text-3xl border-white border rounded-full' />
          </Link>
          <Link 
            to='/dashboard/products:your-products' 
            className={`${linkFocus.products ? 'bg-lime-400 rounded-l-2xl pl-4 py-2' : ''} flex justify-between text-xl my-4  `}
          >
            <p>Products</p> 
            <BiCart className='mt-2 mr-4 text-3xl border-white border rounded-full' />
          </Link>
          <Link 
            to='/dashboard/sales' 
            className={`${linkFocus.sales ? 'bg-lime-400 rounded-l-2xl pl-4 py-2' : ''} flex justify-between text-xl my-4  `}
            >
              <p>Sales </p> 
              <BiDollar className='mt-2 mr-4 text-3xl border-white border rounded-full' />
          </Link>
          <Link 
            to='/dashboard/statics' 
            className={`${linkFocus.statics ? 'bg-lime-400 rounded-l-2xl pl-4 py-2' : ''} flex justify-between text-xl my-4 `}
            >
              <p>Statics</p> 
              <BiStats className='mt-2 mr-4 text-3xl border-white border rounded-full' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard