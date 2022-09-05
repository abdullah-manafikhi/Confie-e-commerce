import { useState , useEffect } from "react"
import { useParams , useNavigate , Link} from "react-router-dom"
import {BiArrowBack} from 'react-icons/bi'
import Dashboard from "./Dashboard"
import AddProducts from "./AddProducts"
import YourProducts from "./YourProducts"


function Products() {

    const [navbarStatus, setNavbarStatus] = useState(false)
    const [tab, setTab] = useState(true)
    const param = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      console.log(param.page);
      (param.page === ':your-products') ? setTab(true) : setTab(false)
    } , [param.page])

  return (
    <div className='flex'>
      <Dashboard Navbar={status => setNavbarStatus(status)} />
      <div className={` ${navbarStatus ? 'hidden':'grid'} w-screen relative left-0 h-screen gap-0`}>
        <p className='text-start ml-8 sm:ml-0 sm:text-center h-1 text-green text-3xl font-bold mt-4'>Products</p>
        <Link to='/' className="btn btn-ghost text-green absolute top-4 right-0"><BiArrowBack className='mr-2' />go back home</Link>
        <div className={`${tab?'mt-0':'mt-10'} row-span-4`}>
          <div className="tabs flex justify-center my-6">
            <span onClick={() => navigate('/dashboard/products:your-products')} class={`${tab ? 'tab-active ' : ''}tab tab-bordered text-green`}>Your Products</span> 
            <span onClick={() => navigate('/dashboard/products:add-products')} class={`${tab ? '' : 'tab-active '}tab tab-bordered text-green`}>Add Products</span> 
          </div>
          {tab ? <YourProducts /> : <AddProducts /> }
        </div>
      </div>
    </div>
  )
}

export default Products
