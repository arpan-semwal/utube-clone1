import React, { useState  , useContext} from 'react'
import { Link , useLocation , useNavigate } from 'react-router-dom';
import { Context } from '../context/contextApi';
import Loader from '../shared/Loader';
import {CgClose} from "react-icons/cg";
import { SlMenu } from 'react-icons/sl';
import {IoIosSearch} from "react-icons/io";
import {RiVideoAddLine} from "react-icons/ri";
import {FiBell} from "react-icons/fi";
import logo from "../assets/logo.png"
const Header = () => {
    const [searchQuery , setSearchQuery] = useState("");

    const {loading , mobileMenu , setMobileMenu} = useContext(Context); //taking 3 states from Context now these states are available

    const navigate = useNavigate();

    const searchQueryHandler = (event) => {
        if((event?.key === "Enter" || event === "searchButton") && searchQuery?.length>0 ){
            navigate(`/searchResults/${searchQuery}`); // will navigate to searchResults page
        }
    }

    const mobileMenuToggle = () => {
      setMobileMenu(!mobileMenu);
    }

    const {pathname} = useLocation();
    const pageName = pathname.split("/").filter(Boolean)?.[0];

  return (
    <div className='sticky top-0 z-10 flex flex-row items-center h-14 px-4 md:px-5 bg-white dark:bg-black justify-between'>
      {loading && <Loader/>} 

      {/* for menubar  */}

      <div className='flex h-5 items-center'>
        {pageName !=="video" && (
          <div className='flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]' onClick={mobileMenuToggle}>

            {mobileMenu ? (
              <CgClose  className='text-white text-xl'/>
            ): (
              <SlMenu className='text-white text-xl' />
            )}

          </div>
        )}


        {/* for logo  */}

      <Link to="/" className='flex h-5 items-center'>
         <img className='h-full hidden dark:md:block' src={logo} alt='YouTube'/>
        <img className='h-full md: hidden' src={logo} alt='YouTube'/>
      </Link>
    </div>



      {/* search bar  */}


      <div className="flex items-center justify-center flex-grow">
        <div className='flex h-8 md:h-10  border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0'>
          <div className='w-10 items-center justify-center hidden group-focus-within:flex'>
            <IoIosSearch className="text-white text-xl"/>
          </div>
          <input 
          type='text' 
          className='bg-transparent outline-none text-white pl-5 md:pl-5  w-64 md:w-96 lg:w-[500px]' 
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={searchQueryHandler}
          value={searchQuery}
          />
        </div>


         {/* search button */}

         <button className='w--[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-tr-4xl bg-white/[0.1]' >
            <IoIosSearch className="text-white text-xl"/>
         </button>
      </div>



      {/* video and icon button */}

      <div className='flex items-center'>
        <div className='hidden md:flex'>
              <div className='flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]'>
              <RiVideoAddLine className='text-white text-xl cursor-pointer'/>
              </div>
              <div className='flex items-center justify-center  ml-2 h-10 w-10 rounded-full hover:bg-[#3030303]/0.6'>
                <FiBell className='text-white text-xl cursor-pointer'/>
              </div>
              <div className='flex h-8 w-8 overflow-hidden rounded-full md:ml-4'>
                  <img src='https://robohash.org/stefan-one'/>
              </div>
        </div>
      </div>

    </div>// px" stands for horizontal padding (left and right)."4" specifies the padding size."md" is a responsive breakpoint. It indicates that the following utility class will apply only when the screen size is medium or larger.
  )
}

export default Header
