import {useEffect , useState , useContext} from 'react'
import {useNavigate , Link} from 'react-router-dom'
import { collection, getDocs , query, limit } from "firebase/firestore";
import {getAuth , onAuthStateChanged} from 'firebase/auth'
import {db} from '../../firebase.config'
import Navbar from '../Navbar'
import Footer from '../Footer';
import {ReactComponent as ShoppingBag} from '../../assets/svg/ShoppingBag.svg'
import FirebaseContext from '../contexts/FirebsaeContext';

function Shop() {
  const [goods, setGoods] = useState([{id:'25' ,data : {name :"chaie" , type:"chair" , price:'222' , image:"https://unsplash.com/photos/FV3GConVSss" , description : "sfd"}} , {id:25 ,data : {name :"chaie" , price:222 , image:"sdf" , discription : "sfd"}}])
  const [initialGoods, setInitialGoods] = useState(null)
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  /*getting data from Firebase Context because
   we have fetched data in the home page so
    we dont have to refetch data in this page */

 const {state , dispatch} = useContext(FirebaseContext)

 const navigate = useNavigate()

  useEffect(() => {
     //checking wether the user is logged in
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true)
          setUserName(user.displayName)
        } else {
          setIsLoggedIn(false)
        }
    });
    if(state.fetchedItems !== null){
      setGoods(state.fetchedItems)
      setInitialGoods(state.fetchedItems)
      setLoading(false) 
  }
  } , [])

  /*
    if the user refreshd the browser 
    we have to refetch the data from firebase because
     the context is now equals to null
     */

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
            setInitialGoods(fetchedItems2)
            setLoading(false)           
        }   
        catch(error){
            console.log(error)
        }   
    }
    if(goods !== null) {fetchListings()}
  } , [])

  // Adding to cart
  const [addCartClicked, setAddCartClicked] = useState('')

  useEffect(() => {
    if(goods !== null){
      console.log([...cart])
      setCart([...cart ,goods.find((good) => good.id === addCartClicked)])
    }
  } , [addCartClicked])

  // sorting the products depending on their price
  const onPriceChange = (e) => {
    console.log(e.target.value)
    const filteredGoods = goods
    if(e.target.value === 'highToLow'){
      const x = filteredGoods.sort((a, b) => b.data.price - a.data.price)
      setGoods([].concat(x))
    }
    else if(e.target.value === 'lowToHigh'){
      const y = filteredGoods.sort((a, b) => a.data.price - b.data.price)
      setGoods([].concat(y))

    }
  }
  //filtering the products depending on their types
  const onTypeChange = (e) => {
    let filtered = initialGoods ;
    (e.target.value === 'all') ? setGoods(filtered) :
    setGoods([].concat(filtered.filter((good) => good.data.type === e.target.value )))
    console.log(goods)
  }

  
console.log(goods)
 return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} userName={userName} />
      <div className="flex flex-auto justify-evenly w-full my-20 ">
        <span className='text-2xl py-4 ml-6 font-semibold'>Filters </span> 
        <form className='ml-6'>
          <select onChange={onPriceChange} className="select select-bordered w-48 max-w-xs mb-4">
            <option disabled selected>Price</option>
            <option value='highToLow'>High to Low</option>
            <option value='lowToHigh'>Low to High</option>
          </select>
          <select onChange={onTypeChange} className="select select-bordered w-48 max-w-xs sm:ml-4">
            <option disabled selected>Type</option>
            <option value='all'>All</option>
            <option value='chair'>Chair</option>
            <option value='sofa'>Sofa</option>
          </select>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-8 my-20 px-8 place-items-center justify-content-center sm:grid-cols-2 lg:grid-cols-3 ">
        {loading ? <h2>Loading...</h2> : goods.map((good) =>(
            <div key={good.id} className="w-72 rounded-2xl bg-base-100 shadow-xl">
              <figure><img className='w-full rounded-t-2xl h-48' src={good.data.image} alt="Shoes" /></figure>
              <div className="card-body">
                <h2 className="card-title text-beige">
                  {good.data.name}
                </h2>
                <p className='text-sm'>{good.data.description}</p>
                <p className='text-sm'>price : {good.data.price}$</p>
                <div className="card-actions justify-end">
                  <button
                    className="ml-4 mt-4 btn btn-primary btn-sm bg-green border-green hover:bg-dark-green hover:border-dark-green"
                    onClick={(e) => setAddCartClicked(e.target.id)}
                    id={good.id}
                    >Add to Cart
                  </button >
                </div>
              </div>
          </div>
        )) }
      </div>
      {cart.forEach((item , index) => item === undefined? cart.splice(index , 1) : item )  }
      {cart.length > 0 &&
        (<span onClick={() => {
          dispatch({
          type : "SET_PURCHASED_ITEMS",
          payload: [...cart]
        })
          navigate('/cart')
      }
        } 
        className="btn btn-ghost fixed right-0 bottom-1/3 rounded-full bg-green h-16 w-16 p-5">
          <ShoppingBag fill='#ffffff' height='32px' width='32px' />
        </span>)
      } 
      <Footer /> 
    </div>
 ) 
}

export default Shop
