import {useState , useEffect , useContext} from 'react'
import { collection, getDocs , query, limit } from "firebase/firestore";
import {db} from '../../firebase.config'
import { useNavigate } from 'react-router';
import FirebaseContext from '../contexts/FirebsaeContext';

 
function YourProducts() {

    const [goods, setGoods] = useState(null)
    const [loading, setLoading] = useState(true)

       // firebase context
    const {dispatch} = useContext(FirebaseContext)

        //useNavigate initialization
        const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
          try{
              //get refrence
             const listingRef = collection(db , 'goods')
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
              setGoods(fetchedItems2)
              setLoading(false)           
          }   
          catch(error){
              console.log(error)
          }   
      }
            fetchListings()
    } , [])

    console.log(goods)

  return (
    <div className="mt-8 text-center">
    {loading ? (<h2 className='mx-auto'>Loading....</h2>) :(
      <table className="table table-compact w-fit mx-auto">
        {/*-- head -- */}
        <thead>
          <tr className='text-center'>
              <th></th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Type</th>
              <th>Capital Price</th>
              <th>Price</th>
          </tr>
          </thead>
          <tbody>
          {goods.map((good , index) =>(
              <tr  key={index} className="hover text-center">
                  <th className='text-sm'>{index + 1}</th>
                  <td className='text-sm'>{good.data.name}</td>
                  <td className='text-sm'>{good.data.quantity}</td>                  
                  <td className='text-sm'>{good.data.type}</td>                  
                  <td className='text-sm'>{good.data.capitalPrice}</td>
                  <td className='text-sm'>{good.data.price}</td>
                  <button id={good.id} onClick={(e) => {dispatch({type:'MODIFING_PRODUCT',payload:goods[index]  }) ; navigate('/dashboard/products:add-products')}} className="btn btn-xs ml-1 font-normal">Modify</button>
              </tr>
          ))}
          </tbody>
      </table>
    )
    }
  </div>
  )
}

export default YourProducts
