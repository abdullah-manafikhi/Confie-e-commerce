import {useState , useEffect , useContext} from 'react'
import { collection, getDocs , query, doc , deleteDoc } from "firebase/firestore";
import {db} from '../../firebase.config'
import { useNavigate } from 'react-router';
import FirebaseContext from '../contexts/FirebsaeContext';
import {BiTrash} from 'react-icons/bi'
import {toast} from 'react-toastify'

 
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

    const handleDelete = async (index) => {
        try{
            if(window.confirm(`Are you sure you want to delete ${goods[index].data.name}`)){
                console.log(goods[index].id)
                await deleteDoc(doc(db , 'goods'  , goods[index].id))
                toast.success('products is Deleted successfully !')
            }
        }
        catch(error){
            console.log(error)
        }
        
    }

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
              <th>Cost Price</th>
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
                  <td>  <button id={good.id} onClick={(e) => {dispatch({type:'MODIFING_PRODUCT',payload:goods[index]  }) ; navigate('/dashboard/products:add-products')}} className="btn btn-xs ml-1 font-normal">Modify</button></td>
                  <td className='px-1'>  <BiTrash className='text-red-700 btn- relative top-1 left-1' onClick={() => handleDelete(index)} /> </td>
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
