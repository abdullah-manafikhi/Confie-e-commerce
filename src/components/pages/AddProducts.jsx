import {useState , useContext, useEffect} from 'react'
import {setDoc , updateDoc , doc , serverTimestamp} from 'firebase/firestore'
import { db } from "../../firebase.config"
import uuid from 'react-uuid'
import {toast} from 'react-toastify'
import FirebaseContext from '../contexts/FirebsaeContext'

function AddProducts() {

    const [formData, setFormData] = useState({
        name:'',
        image:'',
        capitalPrice:'' ,
        price:'',
        type:'',
        description:'',
        quantity:''
    })
    const [updatedItemId, setUpdatedItemId] = useState(null)

    // firebase context
    const {state} = useContext(FirebaseContext)
    //modifing products 
    useEffect(() => {
        if(state.modifingProduct !== null){
        console.log(state.modifingProduct.id)
        setFormData(state.modifingProduct.data)
        setUpdatedItemId(state.modifingProduct.id)
        }
    } ,[])

    const onSubmit = async (e) => {
      e.preventDefault()
      if(updatedItemId === null){
        try{
            await setDoc(doc(db , 'goods' ,uuid()) , formData)
            toast.success('Product is added successfully')
        }
        catch(error){
            console.log(error)
            toast.error('an error accured !')
        }
        }
        else{
            try{
                await updateDoc(doc(db , 'goods' ,updatedItemId) , formData)
                toast.success('Product is updated successfully')
            }
            catch(error){
                console.log(error)
                toast.error('an error accured !')
            }
        }
    }
    console.log(formData    )
  return (
    <>
    {formData === null ? (<h2 className='mx-auto'>Loading....</h2>) : <form onSubmit={onSubmit} className='mt-8 grid grid-cols-1 justify-items-center'>
        <label className='relative right-24 top-3 text-beige bg-white px-2' htmlFor="name"> Name </label>
        <input  
        type="text" 
        onChange={(e) => setFormData({...formData ,name :e.target.value})} 
        defaultValue={formData.name || ""} 
        placeholder="" 
        id='name'
        className="input input-bordered border-beige w-full max-w-xs"
        />
        <label className='relative right-24 top-3 text-beige bg-white px-2' htmlFor="name"> Image URL </label>
        <input 
        type="text" 
        onChange={(e) => setFormData({...formData ,image :e.target.value})} 
        defaultValue={formData.image || ""} 
        className="input input-bordered border-beige w-full max-w-xs" 
        />
        <label className='relative right-24 top-3 text-beige bg-white px-2' htmlFor="name"> Cost Price </label>
        <input  
        type='text'
        onChange={(e) => setFormData({...formData ,capitalPrice :e.target.value})} 
        defaultValue={formData.capitalPrice || ""} 
        className="input input-bordered border-beige w-full max-w-xs"
        />
        <label className='relative right-24 top-3 text-beige bg-white px-2' htmlFor="name"> Price </label>
        <input  
        type='text'
        onChange={(e) => setFormData({...formData ,price :e.target.value})} 
        defaultValue={formData.price || ""} 
        className="input input-bordered border-beige w-full max-w-xs"
        />
        <label className='relative right-24 top-3 text-beige bg-white px-2' htmlFor="name"> Type </label>
        <input  
        type='text'
        onChange={(e) => setFormData({...formData ,type :e.target.value})} 
        defaultValue={formData.type || ""} 
        className="input input-bordered border-beige w-full max-w-xs"
        />
        <label className='relative right-24 top-3 text-beige bg-white px-2' htmlFor="name"> Description </label>
        <input  
        type='text'
        onChange={(e) => setFormData({...formData ,description :e.target.value})} 
        defaultValue={formData.description || ""} 
        className="input input-bordered border-beige w-full max-w-xs"
        />
        <label className='relative right-24 top-3 text-beige bg-white px-2' htmlFor="name"> Quantity </label>
        <input  
        type='text'
        onChange={(e) => setFormData({...formData ,quantity :e.target.value})} 
        defaultValue={formData.quantity || ""} 
        className="input input-bordered border-beige w-full max-w-xs"
        />
        <div className="text-end w-8/12 my-6">
        <button className="btn bg-green">submit</button>
        </div>
   </form>
}
   </>
  )
}

export default AddProducts
