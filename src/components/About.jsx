import heroImg from '../assets/images/heroImg.jpg'

function About({reference}) {
  return (
    <div ref={reference} className='grid grid-cols-1 content-center justify-center text-center h-fit mt-16 sm:mt-0 sm:h-screen'>
        <div className="grid grid-cols-1 sm:grid-cols-3 h-full content-center justify-center">
            <div className='col-span-2 px-6' >
              <h2 className='text-2xl text-green font-bold'>About Us</h2>
              <p className='mt-8 px-8 justify-self-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum placeat exercitationem quas quasi itaque error a perspiciatis eos temporibus nemo tenetur, quaerat ipsam mollitia, possimus autem aliquid? Harum, doloribus ex.
                  dolores dolor eum eveniet! Sed esse ad itaque Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis delectus, ad perferendis assumenda voluptas vero nemo aliquam architecto porro in commodi, deleniti, consequatur quaerat voluptatum laborum voluptates quidem. Perferendis, sequi! aspernatur accusamus iure commodi cupiditate sapiente officia repudiandae. Nostrum numquam voluptate eos nam?
              </p>
            </div> 
            <figure className='justify-self-center hidden relative top-16 right-4 sm:block'><img className='h-72 w-72 rounded-xl' src={heroImg} alt="" /></figure>
        </div> 
    </div>
  )
}

export default About
