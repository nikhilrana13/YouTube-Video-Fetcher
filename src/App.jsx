
import Fetchdata from './Components/fetchdata';
import './index.css'
import React  from 'react';


function App() {

  return (
     <>
     <div className='app flex flex-col items-center  w-full h-full gap-10 '>
         <div className=' w-[60%] header flex justify-evenly items-center  mt-[3rem] p-8 gap-5'>

         <div className="logo">
          <img className='Logo w-[200px] h-[200px]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/YouTube_social_white_square_%282017%29.svg/450px-YouTube_social_white_square_%282017%29.svg.png?20220808215424" alt="" /> 
         </div>
         <div className='Title'>
            <h1 className='responsive-title text-[2.8rem] leading-none font-semibold text-[#000]'>Youtube video Downloader</h1>
         </div>

         </div>
         <div className=''>
         <Fetchdata />
         </div>
     </div>
     </>
  )
}

export default App
