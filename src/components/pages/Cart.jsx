import {useContext , useState , useEffect} from 'react'
import FirebaseContext from '../contexts/FirebsaeContext'
import {getAuth} from 'firebase/auth'
import { doc, setDoc , updateDoc } from "firebase/firestore";
import { db } from '../../firebase.config';
import uuid from 'react-uuid';
import {toast} from 'react-toastify'
import {BiUpArrow , BiDownArrow , BiArrowBack } from 'react-icons/bi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link} from 'react-router-dom'
 
function Cart() {

    const {state} = useContext(FirebaseContext)
    const [purchasedItems, setPurchasedItems] = useState(state.purchasedItems)
    const [counter, setCounter] = useState(purchasedItems !== null && purchasedItems.map(() => [].push(parseInt(1))))

    const handleCloseClick = (target) => {
      const ItemId = purchasedItems.findIndex((x) => x.id)
      setPurchasedItems((prevState) => prevState.splice(ItemId , 1))
      console.log(purchasedItems)
    }

    const handleCounterChange = (id , index) => { 
      console.log(id)
      setCounter((prevState) => {
        let test = [...prevState]
        id === '+' ? test[index] +=1 :test[index] !== 1 ? test[index] -=1 : test[index] = test[index] 
        return test
    }
      )
    }

    const handlePurchaseClick = (e) => {
      console.log(purchasedItems.length)
      const applicatingPurchase = async (item , index , auth) => { 
        await setDoc(doc(db, "sales", uuid()), {
          userId : auth.currentUser.uid,
          itemId : item.id,
          itemName : item.data.name,
          price : item.data.price,
          totalPrice:item.data.price*counter[index],
          capitalPrice : item.data.capitalPrice,
          quantity : counter[index]
        });}

      const updatingGoods = async (item ,index , auth) => {
        await updateDoc(doc(db , 'goods' ,item.id) , {
          quantity: item.data.quantity - counter[index]
        }) 
      }

      try{
      const auth = getAuth()
      purchasedItems.map((item  , index) =>{
        applicatingPurchase(item , index , auth)
        updatingGoods(item , index ,auth)
      })
      toast.success('purchase success')
    }
      catch(error){
        console.log(error)
        toast.error('purchase failed')
      }
      
      }
    
    
     
    return (
        <div className='w-screen min-h-screen grid grid-cols-1 justify-items-center py-20 bg-beige text-md'>
          <Link to='/shop' className='flex flex-auto text-green w-full absolute top-6 left-8 my-0'> <BiArrowBack className='mt-1.5 mr-2' /> Go Back</Link>
          <div className="glass w-full h-auto sm:w-10/12 lg:w-8/12 rounded-2xl py-6 px-4">
            <h2 className='mx-auto text-center text-4xl font font-bold text-green'>Your Cart</h2>
          <div className="mt-4"> { (purchasedItems !== null ) ? 
            (purchasedItems.map((item , index) => 
                (<div key={index} className='shadow-md rounded-2xl mt-2'>
                  <span className='flex justify-end relative top-4' ><AiFillCloseCircle className='' id={item.id} onClick={(e) => handleCloseClick(e.target.id)} /> </span>
                  <div className='grid grid-cols-4 gap-4 sm:gap-16 mx-auto py-6 text-center' >
                      <span className=' mx-4 h-24 w-24'>
                          <img 
                            src={item.data.image} 
                            className='rounded-full h-20 w-20 sm:w-24 sm:h-24' 
                            alt="product image" />
                      </span>
                      <span className='py-8 pl-4 sm:pl-0'>{item.data.name}</span>
                      <span className='py-8 flex flex-auto justify-evenly'>
                        {counter[index]}
                        <div>
                          <BiUpArrow onClick={() => handleCounterChange('+',index)} />
                          <BiDownArrow id='-'onClick={() => handleCounterChange('-',index)} />
                        </div>
                      </span>
                      <span className='py-8'>{(item.data.price) * counter[index]}$</span>
                  </div>
                </div>)
            )) : (<div> No purchased items </div>) }
            </div>
            <div className="flex flex-auto justify-between w-full mt-12 pr-10">
              <span>
                <button onClick={(e) => handlePurchaseClick(e)} className='btn btn-ghost text-white bg-green rounded-2xl'>Purchase</button>
              </span>
              <span>
              Total {purchasedItems !== null && purchasedItems.reduce((initial , current , index) => {
                return initial + parseInt(current.data.price)*counter[index]
                } , 0)}$
              </span>

            </div>
          </div>
        </div>
      )
      console.log(counter)
    }

export default Cart
