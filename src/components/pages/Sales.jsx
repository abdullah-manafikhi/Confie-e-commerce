import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom';
import { collection, getDocs , query, limit } from "firebase/firestore";
import {db} from '../../firebase.config'
import {BiArrowBack} from 'react-icons/bi'
import Dashboard from './Dashboard'

function Sales() {

    const [navbarStatus, setNavbarStatus] = useState(false)
    const [sales, setSales] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchListings = async () => {
          try{
              //get refrence
             const listingRef = collection(db , 'sales')
             //create query
             const q = query(
                 listingRef
             )
             const querySnap = await getDocs(q)
             //execute query 
             let fetchedItems2 = []
             querySnap.forEach((doc) => {
   
                  return fetchedItems2.push({
                      id: doc.id , 
                      data: doc.data()
                  })
              })
              setSales(fetchedItems2)
              setLoading(false)           
          }   
          catch(error){
              console.log(error)
          }   
      }
            fetchListings()
    } , [])

    console.log(sales)

  return (
    <div className='flex'>
      <Dashboard Navbar={status => setNavbarStatus(status)} />
      <div className={` ${navbarStatus ? 'hidden':'block'} w-screen relative left-0`}>
        <p className='text-center text-green text-3xl mt-4 font-bold'>Sales</p>
        <Link to='/' className="btn btn-ghost text-green absolute top-4 right-0"><BiArrowBack className='mr-2' />go back home</Link>
        <div className="mt-16 text-center">
          {loading ? (<h2 className='mx-auto'>Loading....</h2>) :(
            <table className="table table-compact w-fit text-center mx-auto">
              {/*-- head -- */}
              <thead>
                <tr>
                    <th></th>
                    <th>User Email</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Cost Price</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {sales.map((sale , index) =>(
                    <tr key={index} className="hover">
                        <th className='text-sm'>{index + 1}</th>
                        <td className='text-sm'>{sale.data.userEmail}</td>
                        <td className='text-sm'>{sale.data.itemName}</td>
                        <td className='text-sm'>{sale.data.price}</td>
                        <td className='text-sm'>{sale.data.capitalPrice}</td>
                        <td className='text-sm'>{sale.data.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
          )
          }
        </div>
        <div className="flex justify-evenly w-full pr-10">
              <span className='bg-gray-100'>
                Sales Total : {sales !== null && sales.reduce((initial , current , index) => {
                  return initial + current.data.price*current.data.quantity
                  } , 0)}$
              </span>
              <span className='bg-gray-100'>
                Income : {sales !== null && sales.reduce((initial , current , index) => {
                  return initial + (current.data.price - current.data.capitalPrice)
                  } , 0)}$
              </span>
            </div>
      </div>
    </div>
  )
}

export default Sales
