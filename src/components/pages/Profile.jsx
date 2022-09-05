import {useState , useContext , useEffect} from 'react'
import {getAuth , onAuthStateChanged} from 'firebase/auth'
import FirebaseContext from '../contexts/FirebsaeContext';
import { collection, getDocs , query, limit ,where } from "firebase/firestore";
import { db } from '../../firebase.config';
import Navbar from '../Navbar';

function Profile() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
 const {state} = useContext(FirebaseContext)

 useEffect(() => {
  //checking wether the user is logged in
  let userEmail
  if(state.userCredentials !== null){ 
    console.log(state.userCredential)
   const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
        setUserName(user.displayName)
        userEmail = user.email
        const fetchListings = async () => {
          try{
            //get refrence
           const listingRef = collection(db , 'sales')
           //create query
           const q = query(
              listingRef,
              where("userEmail", "==", userEmail)
           );
           const querySnap = await getDocs(q)
           //execute query 
           let fetchedItems2 = []
           querySnap.forEach((doc) => {
    
                return fetchedItems2.push({
                    data:doc.data()
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
        console.log(user)
      } else {
        setIsLoggedIn(true)
        setUserName(state.userCredential.displayName)
      }
    });
  }
} , [])

const [sales, setSales] = useState(null)
const [loading, setLoading] = useState(true)

 
 return (  
    <div>
      {console.log(sales)}
      <Navbar isLoggedIn={isLoggedIn} userName={userName} />
      <div className="grid grid-cols-1 content-center h-56 mt-24">
        {sales === null ? (<h2>Loading...</h2>) : 
          <div className="text-center">
            
            <h2 className='text-2xl text-green font-semibold my-4'>Your Previous Purchases</h2>
            {loading ? (<h2 className='mx-auto'>Loading....</h2>) : sales === null ||  sales.length !== 0 ? (
                <table className="table table-compact w-fit mt-8 mx-auto">
                  {/*-- head -- */}
                  <thead>
                    <tr>
                        <th>index</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sales.map((sale , index) =>(
                        <tr key={index} className="hover">
                            <th className='text-sm'>{index + 1}</th>
                            <td className='text-sm'>{sale.data.itemName}</td>
                            <td className='text-sm'>{sale.data.price}</td>
                            <td className='text-sm'>{sale.data.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
              )
              : (<h2>There is no purchased items yet</h2>)
              }
          </div>
        }
        
      </div>
    </div>
  )
}

export default Profile
