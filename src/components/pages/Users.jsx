import {useState ,useEffect , useContext} from 'react'
import { Link } from 'react-router-dom';
import Dashboard from "./Dashboard"
import { collection, getDocs , query, limit } from "firebase/firestore";
import {db} from '../../firebase.config'
import { BiArrowBack } from 'react-icons/bi'


function Users() {

    const [navbarStatus, setNavbarStatus] = useState(false)
    const [users, setUsers] = useState([{id:12 , data : {name:"dsaf" ,email:'adf@asdf.com' , timestamp:{nanoseconds:5}}}])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchListings = async () => {
          try{
              //get refrence
             const listingRef = collection(db , 'users')
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
              setUsers(fetchedItems2)
              setLoading(false)           
          }   
          catch(error){
              console.log(error)
          }   
      }
        fetchListings()
    } , [])


  return (
    <div className='flex'>
      <Dashboard Navbar={status => setNavbarStatus(status)} />
      <div className={`${navbarStatus ? 'hidden':'block'} w-screen pl-2 pr-6 relative left-0`}>
        <p className='text-start ml-6 sm:ml-0 sm:text-center text-green text-3xl font-bold mt-4'>Users</p>
        <Link to='/' className="btn btn-ghost text-green absolute top-4 right-0"><BiArrowBack className='mr-2' />go back home</Link>
        <div className="mt-16 text-center">
          {loading ? (<h2 className='mx-auto'>Loading....</h2>) :(
            <table className="table table-compact w-fit mx-auto">
              {/*-- head -- */}
              <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {
                users.map((user , index) =>{
                  let date = new Date(user.data.timestamp.seconds * 1000);
                  return(
                    <tr key={index} className="hover">
                        <th className='text-sm'>{index + 1}</th>
                        <td className='text-sm'>{user.data.name}</td>
                        <td className='text-sm'>{user.data.email}</td>
                        <td className='text-sm'>{date.toUTCString()}</td>
                    </tr>
                )})}
                </tbody>
            </table>
          )
          }
        </div>
      </div>
    </div>
  ) 
}

export default Users
