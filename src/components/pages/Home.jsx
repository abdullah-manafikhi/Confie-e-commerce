import {useEffect , useState , useRef , useContext} from 'react'
import {Link} from 'react-router-dom'
import FirebaseContext from '../contexts/FirebsaeContext';
import Navbar from "../Navbar"
import Hero from '../Hero'
import About from '../About';
import Footer from '../Footer';
import { collection, getDocs , query, limit } from "firebase/firestore";
import { db } from "../../firebase.config";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination ,Autoplay , Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import { toast } from 'react-toastify';

function Home() {
  const [goods, setGoods] = useState(null)
  const [initialGoods, setInitialGoods] = useState(null)
  const [loading, setLoading] = useState(true)

  const {state , dispatch} = useContext(FirebaseContext)

  const aboutBtnRef = useRef()
  const aboutSecRef = useRef()

  useEffect(() => { 
   const fetchListings = async () => {
       try{
           //get refrence
          const listingRef = collection(db , 'goods')
          //create query
          const q = query(
              listingRef,
              limit(10)
          )
          const querySnap = await getDocs(q)
          //execute query 
          let fetchedItems = []
          querySnap.forEach((doc) => {

               return fetchedItems.push({
                   id: doc.id , 
                   data: doc.data()
               })
           })
           setGoods(fetchedItems)
           setInitialGoods(fetchedItems)
           setLoading(false) 
           dispatch({
             type: 'FETCHED_ITEMS',
             payload : fetchedItems
           })          
       }   
       catch(error){
         console.log(error)
       }   
   }
   fetchListings()

  } , [])

  const scrollToDiv = (ref) =>{
    window.scrollTo(0, ref.current.offsetTop);
  }
  let index = 0;
  const vpnNote = () => {
    ++index;
    if(index === 1){
      toast.info('If you are in Syria please turn on your VPN so the website\'s can work properly')
    }
  }
  

  return (
    <div  onLoad={() => vpnNote()}>
      <Navbar displayAbout={true} reference={aboutBtnRef} click={() => scrollToDiv(aboutSecRef)} />
      <Hero />
      <div className={`mt-8 grid-cols-1 justify-center text-center w-8/12 md:w-10/12 lg:w-12/12 mx-auto my-24`}>
        <h2 className="mt-24 mb-10 text-green text-4xl font-bold">Best Seller</h2>
        <Swiper
          className='mx-auto '
          spaceBetween={50}
          breakpoints={{
            900 : {
              slidesPerView : 3
            },
            600 : {
              slidesPerView : 2
            },
            280 : {
              slidesPerView : 1
            }
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Pagination , Autoplay]}
        >
        {loading ? <h2>Loading...</h2> : goods.map((good , index) =>(
            <SwiperSlide key={index} className='mx-auto'>
              <div key={good.id} className="card w-56 sm:w-64 shadow-xl">
                <figure><img className='w-full rounded-t-xl h-40' src={good.data.image} alt="Shoes" /></figure>
                <div className="card-body text-start ">
                  <h2 className="card-title text-beige">
                    {good.data.name}
                  </h2>
                  <p className='h-8 w-fit text-xs'>{good.data.description}</p>
                  <p className='text-xs'>price : {good.data.price}$</p>
                  <div className="card-actions justify-end">
                    <Link
                      to='/shop' 
                      className="ml-4 mt-4 btn btn-primary btn-sm bg-green border-green hover:bg-dark-green hover:border-dark-green"
                      id={good.id}
                      >Start shopping
                    </Link >
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )) }     
          </Swiper>
      </div>
      <About reference={aboutSecRef} /> 
      <Footer/>
    </div>
  )
}

export default Home
