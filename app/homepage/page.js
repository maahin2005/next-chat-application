import MainContent from '@/components/homepage/MainContent'
import HomePageNav from '@/components/homepage/Navbar'
import SearchFriends from '@/components/homepage/SearchFriends'
import React from 'react'

function homepage() {
  return (
    <div className="md:h-screen text-blue-950 ">
      <div>

      <HomePageNav/>
      </div>
      <div className="my-5 mb-5 md:mt-18">
        <SearchFriends/>
      </div>
      <div className='max-h-[500px] overflow-y-auto' style={{scrollbarWidth: "none"}}>
        <MainContent/>
      </div>

    </div>
  )
}

export default homepage
// bg-gradient-to-br from-[#93A5CF] to-[#E4EfE9]